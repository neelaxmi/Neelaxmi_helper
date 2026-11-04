
const firebaseConfig = {
    apiKey: "AIzaSyAOJmK4igVb_P8cV6jLfZhFPGFmAZfVvRE",
    authDomain: "classupdates.netlify.app",
    projectId: "quiznew-30700",
    storageBucket: "quiznew-30700.firebasestorage.app",
    messagingSenderId: "107821881642",
    appId: "1:107821881642:web:7d708bda99196c85e42653",
    measurementId: "G-0B6095T5X7"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

const BATTLE_CONFIG = {
    STARTING_BALANCE: 100,
    MAX_WAGER: 500,
    QUESTION_COUNTS: [5, 10, 15, 50],
    TIME_PER_QUESTION_MS: 20000,
    RESOLVE_GRACE_MS: 3000,
    CORRECT_FASTEST: 4,
    CORRECT_SLOWER: 0,
    INCORRECT: -1,
    NO_ANSWER: 0,
};

let CURRENT_USER = null; 
let myProfile = null;    
let unsubMyProfile = null;


function periodKeys(date = new Date()) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return { daily: `${y}-${m}-${d}`, monthly: `${y}-${m}`, yearly: `${String(y)}` };
}

function applyCoinDelta(coinStats, delta) {
    const keys = periodKeys();
    const next = { ...coinStats };
    ['daily', 'monthly', 'yearly'].forEach(period => {
        const bucket = next[period] && next[period].periodKey === keys[period]
            ? next[period]
            : { amount: 0, periodKey: keys[period] };
        next[period] = { amount: bucket.amount + delta, periodKey: keys[period] };
    });
    return next;
}

async function ensurePublicProfile(user) {
    const ref = db.collection('public_profiles').doc(user.uid);
    const doc = await ref.get();
    if (!doc.exists) {
        const keys = periodKeys();
        await ref.set({
            uid: user.uid,
            name: user.displayName || (user.email ? user.email.split('@')[0] : 'Player'),
            photoURL: user.photoURL || null,
            balance: BATTLE_CONFIG.STARTING_BALANCE,
            coinStats: {
                daily: { amount: 0, periodKey: keys.daily },
                monthly: { amount: 0, periodKey: keys.monthly },
                yearly: { amount: 0, periodKey: keys.yearly },
            },
            battleStats: { wins: 0, losses: 0, draws: 0, totalBattles: 0 },
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
    } else {
        const data = doc.data();
        const patch = {};
        if (user.displayName && data.name !== user.displayName) patch.name = user.displayName;
        if (user.photoURL && data.photoURL !== user.photoURL) patch.photoURL = user.photoURL;
        if (Object.keys(patch).length) await ref.update(patch);
    }
}

function initAuth(onReady) {
    auth.onAuthStateChanged(async (user) => {
        if (unsubMyProfile) { unsubMyProfile(); unsubMyProfile = null; }

        if (!user) {
            CURRENT_USER = null;
            myProfile = null;
            onReady(false);
            return;
        }

        CURRENT_USER = { uid: user.uid, name: user.displayName, photoURL: user.photoURL };
        try {
            await ensurePublicProfile(user);
        } catch (e) {
            console.error('❌ Battle: could not set up public profile.', e);
        }

        unsubMyProfile = db.collection('public_profiles').doc(user.uid).onSnapshot(doc => {
            if (doc.exists) {
                myProfile = doc.data();
                if (typeof onProfileChange === 'function') onProfileChange(myProfile);
            }
        });

        onReady(true);
    });
}


async function loadBattleQuizSources() {
    const snap = await db.collection('quizzes').get();
    console.log('[Battle][SUCCESS] Quiz sources loaded.', {count: snap.size});
    return snap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .filter(q => Array.isArray(q.questions) && q.questions.length >= Math.min(...BATTLE_CONFIG.QUESTION_COUNTS))
        .sort((a, b) => (a.title || '').localeCompare(b.title || ''));
}

function shuffledSample(arr, n) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, n);
}

function randomBattleCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no 0/O/1/I — easy to read aloud
    let code = '';
    for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
    return code;
}

async function createBattle({ sourceQuiz, questionCount, wager }) {
    try {
        if (!CURRENT_USER) throw new Error('Not signed in.');
        if (!Number.isInteger(wager) || wager < 0 || wager > BATTLE_CONFIG.MAX_WAGER) {
            throw new Error(`Wager must be between 0 and ${BATTLE_CONFIG.MAX_WAGER} coins.`);
        }
        if (!BATTLE_CONFIG.QUESTION_COUNTS.includes(questionCount)) {
            throw new Error('Select a supported question count.');
        }
        if (!sourceQuiz || !Array.isArray(sourceQuiz.questions) || sourceQuiz.questions.length < questionCount) {
            throw new Error('This quiz does not have enough questions.');
        }

        const profileRef = db.collection('public_profiles').doc(CURRENT_USER.uid);
        const battleRef = db.collection('battles').doc();
        const code = randomBattleCode();
        const picked = shuffledSample(
            sourceQuiz.questions.map((q, i) => ({ ...q, qId: `Q${i + 1}` })),
            questionCount
        );
        const questionsForClients = picked.map(q => ({
            qId: q.qId,
            question: q.question,
            options: q.options,
            imageUrl: q.imageUrl || null,
        }));

        // Atomically deduct only the host's own entry fee and create the battle.
        await db.runTransaction(async tx => {
            const profileDoc = await tx.get(profileRef);
            if (!profileDoc.exists) throw new Error('Player profile not found. Please refresh and try again.');

            const balance = Number(profileDoc.data().balance || 0);
            if (balance < wager) throw new Error(`You have ${balance} coins. You need ${wager} coins.`);

            tx.update(profileRef, {
                balance: balance - wager,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            tx.set(battleRef, {
                code,
                hostUid: CURRENT_USER.uid,
                player1: {
                    uid: CURRENT_USER.uid,
                    name: CURRENT_USER.name || 'Player 1',
                    photoURL: CURRENT_USER.photoURL || null,
                    score: 0
                },
                player2: null,
                sourceQuizId: sourceQuiz.id,
                sourceQuizTitle: sourceQuiz.title || 'Quiz',
                questionCount,
                wager,
                questions: questionsForClients,
                status: 'waiting',
                currentQuestionIndex: -1,
                questionStartedAt: null,
                settled: false,
                winnerUid: null,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            });
        });

        // Answer keys are written after battle creation because their rules
        // verify the already-created parent battle and its host.
        const batch = db.batch();
        picked.forEach((q, i) => {
            batch.set(battleRef.collection('answerKeys').doc(String(i)), {
                correctOption: q.answer
            });
        });
        await batch.commit();

        const result = { battleId: battleRef.id, code, entryFee: wager };
        console.log('[Battle][SUCCESS] Battle created; host entry fee deducted.', result);
        return { battleId: battleRef.id, code };
    } catch (error) {
        console.error('[Battle][ERROR] Battle creation failed.', {
            code: error.code || 'unknown',
            message: error.message,
            error
        });
        throw error;
    }
}

async function joinBattleByCode(code) {
    try {
        if (!CURRENT_USER) throw new Error('Not signed in.');
        const cleanCode = String(code || '').trim().toUpperCase();
        if (!/^[A-HJ-NP-Z2-9]{6}$/.test(cleanCode)) {
            throw new Error('Enter a valid 6-character battle code.');
        }

        const query = await db.collection('battles')
            .where('code', '==', cleanCode)
            .where('status', '==', 'waiting')
            .limit(1)
            .get();

        if (query.empty) throw new Error('No open battle found with that code.');

        const battleRef = query.docs[0].ref;
        const profileRef = db.collection('public_profiles').doc(CURRENT_USER.uid);

        await db.runTransaction(async tx => {
            // Read all documents before performing any transaction writes.
            const battleDoc = await tx.get(battleRef);
            const profileDoc = await tx.get(profileRef);

            if (!battleDoc.exists) throw new Error('Battle no longer exists.');
            if (!profileDoc.exists) throw new Error('Your player profile was not found. Refresh and try again.');

            const battle = battleDoc.data();
            if (battle.status !== 'waiting' || battle.player2) {
                throw new Error('This battle is already started or full.');
            }
            if (battle.player1.uid === CURRENT_USER.uid) {
                throw new Error("You can't join your own battle.");
            }

            const wager = Number(battle.wager || 0);
            const balance = Number(profileDoc.data().balance || 0);
            if (!Number.isInteger(wager) || wager < 0 || wager > BATTLE_CONFIG.MAX_WAGER) {
                throw new Error('This battle has an invalid entry fee.');
            }
            if (balance < wager) throw new Error(`You need ${wager} coins to join this battle.`);

            // A player can only spend their own coins; host balance is untouched.
            tx.update(profileRef, {
                balance: balance - wager,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            tx.update(battleRef, {
                player2: {
                    uid: CURRENT_USER.uid,
                    name: CURRENT_USER.name || 'Player 2',
                    photoURL: CURRENT_USER.photoURL || null,
                    score: 0
                },
                status: 'active',
                currentQuestionIndex: 0,
                questionStartedAt: firebase.firestore.FieldValue.serverTimestamp(),
                startedAt: firebase.firestore.FieldValue.serverTimestamp(),
            });
        });

        const result = { battleId: battleRef.id, uid: CURRENT_USER.uid };
        console.log('[Battle][SUCCESS] Player joined; own entry fee deducted.', result);
        return { battleId: battleRef.id };
    } catch (error) {
        console.error('[Battle][ERROR] Join battle failed.', {
            code: error.code || 'unknown',
            message: error.message,
            error
        });
        throw error;
    }
}

function cancelWaitingBattle(battleId) {
    return db.collection('battles').doc(battleId).update({ status: 'cancelled' });
}

// =============================================================================
// LIVE BATTLE — listening, answering, scoring, advancing
// =============================================================================

function listenToBattle(battleId, onUpdate) {
    return db.collection('battles').doc(battleId).onSnapshot(doc => {
        if (doc.exists) onUpdate({ id: doc.id, ...doc.data() });
    });
}

function myPlayerKey(battle) {
    if (battle.player1.uid === CURRENT_USER.uid) return 'player1';
    if (battle.player2 && battle.player2.uid === CURRENT_USER.uid) return 'player2';
    return null;
}
function opponentOf(battle) {
    const key = myPlayerKey(battle);
    return key === 'player1' ? battle.player2 : battle.player1;
}

async function submitAnswer(battleId, qIndex, selectedOption) {
    const ref = db.collection('battles').doc(battleId).collection('answers').doc(`${CURRENT_USER.uid}_${qIndex}`);
    try {
        await ref.create({
            uid: CURRENT_USER.uid,
            qIndex,
            selectedOption,
            answeredAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
        console.log('[Battle][SUCCESS] Answer submitted.', {battleId, qIndex, timedOut: selectedOption === null});
        return true;
    } catch (e) {
        if (e.code === 'already-exists') {
            console.warn('[Battle][INFO] Duplicate answer ignored.', {battleId, qIndex});
            return false;
        }
        console.error('[Battle][ERROR] Answer submission failed.', e);
        throw e;
    }
}

function watchQuestionForResolution(battle, qIndex) {
    const battleId = battle.id;
    const myUid = CURRENT_USER.uid;
    const opponent = opponentOf(battle);
    if (!opponent) return () => {};
    const oppUid = opponent.uid;
    const key = myPlayerKey(battle);

    const answersCol = db.collection('battles').doc(battleId).collection('answers');
    const deadlineMs = battle.questionStartedAt
        ? battle.questionStartedAt.toMillis() + BATTLE_CONFIG.TIME_PER_QUESTION_MS
        : Date.now() + BATTLE_CONFIG.TIME_PER_QUESTION_MS;

    let resolved = false;
    let resolving = false;
    let unsubMy, unsubOpp, timeoutId;

    const cleanup = () => { if (unsubMy) unsubMy(); if (unsubOpp) unsubOpp(); if (timeoutId) clearTimeout(timeoutId); };

    const tryResolve = async () => {
        if (resolved || resolving) return;
        resolving = true;
        try {
        const myDoc = await answersCol.doc(`${myUid}_${qIndex}`).get();
        if (!myDoc.exists) { resolving = false; return; }

        const oppDoc = await answersCol.doc(`${oppUid}_${qIndex}`).get();
        if (!oppDoc.exists && Date.now() < deadlineMs + BATTLE_CONFIG.RESOLVE_GRACE_MS) { resolving = false; return; }

        resolved = true;
        cleanup();

        const keyDoc = await db.collection('battles').doc(battleId).collection('answerKeys').doc(String(qIndex)).get();
        const correctOption = keyDoc.exists ? keyDoc.data().correctOption : null;

        const myData = myDoc.data();
        const oppData = oppDoc.exists ? oppDoc.data() : null;
        const myCorrect = myData.selectedOption !== null && myData.selectedOption === correctOption;

        let delta = BATTLE_CONFIG.NO_ANSWER;
        if (myData.selectedOption === null) {
            delta = BATTLE_CONFIG.NO_ANSWER;
        } else if (!myCorrect) {
            delta = BATTLE_CONFIG.INCORRECT;
        } else {
            const oppCorrect = oppData && oppData.selectedOption !== null && oppData.selectedOption === correctOption;
            const oppWasFaster = oppCorrect && oppData.answeredAt && myData.answeredAt
                && oppData.answeredAt.toMillis() < myData.answeredAt.toMillis();
            delta = oppWasFaster ? BATTLE_CONFIG.CORRECT_SLOWER : BATTLE_CONFIG.CORRECT_FASTEST;
        }

        await db.collection('battles').doc(battleId).update({
            [`${key}.score`]: firebase.firestore.FieldValue.increment(delta),
        });

        await advanceQuestion(battleId, qIndex, battle.questions.length);
        console.log('[Battle][SUCCESS] Question resolved.', {battleId, qIndex, scoreDelta: delta});
        } catch (error) {
            resolving = false;
            console.error('[Battle][ERROR] Question resolution failed.', {battleId, qIndex, error});
        }
    };

    unsubMy = answersCol.doc(`${myUid}_${qIndex}`).onSnapshot(tryResolve, error => console.error('[Battle][ERROR] Own answer listener failed.', error));
    unsubOpp = answersCol.doc(`${oppUid}_${qIndex}`).onSnapshot(tryResolve, error => console.error('[Battle][ERROR] Opponent answer listener failed.', error));
    timeoutId = setTimeout(tryResolve, Math.max(0, deadlineMs + BATTLE_CONFIG.RESOLVE_GRACE_MS - Date.now()));

    return cleanup;
}

async function advanceQuestion(battleId, fromIndex, totalQuestions) {
    const ref = db.collection('battles').doc(battleId);
    await db.runTransaction(async (tx) => {
        const doc = await tx.get(ref);
        const data = doc.data();
        if (data.currentQuestionIndex !== fromIndex) return; // already advanced by the other client
        const nextIndex = fromIndex + 1;
        if (nextIndex >= totalQuestions) {
            tx.update(ref, { currentQuestionIndex: nextIndex, status: 'finished', finishedAt: firebase.firestore.FieldValue.serverTimestamp() });
        } else {
            tx.update(ref, { currentQuestionIndex: nextIndex, questionStartedAt: firebase.firestore.FieldValue.serverTimestamp() });
        }
    });
}


async function settleBattleIfNeeded(battleId) {
    try {
        const battleRef = db.collection('battles').doc(battleId);
        let settlementWinnerUid = null;

        await db.runTransaction(async tx => {
            const battleDoc = await tx.get(battleRef);
            if (!battleDoc.exists) throw new Error('Battle not found.');

            const battle = battleDoc.data();
            if (battle.settled) {
                settlementWinnerUid = battle.winnerUid;
                return;
            }
            if (battle.status !== 'finished' || !battle.player2) {
                throw new Error('Battle is not ready for settlement.');
            }

            const p1Score = Number(battle.player1.score || 0);
            const p2Score = Number(battle.player2.score || 0);
            let winnerUid = null;

            if (p1Score > p2Score) winnerUid = battle.player1.uid;
            else if (p2Score > p1Score) winnerUid = battle.player2.uid;

            settlementWinnerUid = winnerUid || 'draw';

            // No cross-user balance writes or client-side coin payout on Spark.
            tx.update(battleRef, {
                settled: true,
                winnerUid: settlementWinnerUid,
                settledAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        });

        console.log('[Battle][SUCCESS] Battle result settled; no coin transfer.', {
            battleId,
            winnerUid: settlementWinnerUid
        });
        return settlementWinnerUid;
    } catch (error) {
        console.error('[Battle][ERROR] Battle settlement failed.', {
            battleId,
            code: error.code || 'unknown',
            message: error.message,
            error
        });
        throw error;
    }
}

async function getExplanationForBattleQuestion(sourceQuizId, qId) {
    try {
        const doc = await db.collection('quiz_explanations').doc(`${sourceQuizId}_${qId}`).get();
        return doc.exists ? doc.data() : null;
    } catch (e) {
        return null;
    }
}

// =============================================================================
// LEADERBOARD
// =============================================================================

async function loadLeaderboard(period = 'allTime', max = 50) {
    const keys = periodKeys();

    if (period === 'allTime') {
        const snap = await db.collection('public_profiles')
            .orderBy('battleStats.wins', 'desc')
            .limit(max)
            .get();
        return snap.docs.map(d => ({ id: d.id, ...d.data(), displayAmount: d.data().battleStats?.wins || 0 }));
    }

    const field = `coinStats.${period}.amount`;
    const snap = await db.collection('public_profiles').orderBy(field, 'desc').limit(max * 2).get(); 

    return snap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .map(p => {
            const bucket = p.coinStats && p.coinStats[period];
            const isCurrent = bucket && bucket.periodKey === keys[period];
            return { ...p, displayAmount: isCurrent ? bucket.amount : 0 };
        })
        .sort((a, b) => b.displayAmount - a.displayAmount)
        .slice(0, max);
}
