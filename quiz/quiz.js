
let allQuestions = []; 
let questions = [];   
let currentIndex = 0;
let userAnswers = {}; 
let timeLeft = 0;
let timerInterval = null;
let isPaused = false;
let currentMode = 'test';
let checkedQuestions = {}; 

const quizEls = {
    loader: document.getElementById('loading-screen'),
    container: document.getElementById('quiz-container'),
    title: document.getElementById('quiz-title'),
    time: document.getElementById('time-display'),
    qText: document.getElementById('question-text'),
    opts: document.getElementById('options-area'),
    progressBar: document.getElementById('progress-bar'),
    prev: document.getElementById('prev-btn'),
    next: document.getElementById('next-btn'),
    submit: document.getElementById('submit-btn'),
    pause: document.getElementById('pause-btn'),
    resume: document.getElementById('resume-btn'),
    pausedOverlay: document.getElementById('paused-overlay'),
    saveBtn: document.getElementById('save-btn'),
    exitModal: document.getElementById('exit-modal'),
    resumeModal: document.getElementById('resume-modal'),
    setupModal: document.getElementById('setup-modal'), 
    setupSet: document.getElementById('setup-question-set'),
    setupTimer: document.getElementById('setup-timer'),
    startBtn: document.getElementById('btn-start-custom'),
    setupTitle: document.getElementById('setup-quiz-title'),
    setupModal: document.getElementById('setup-modal'),
    setupHistoryToggle: document.getElementById('toggle-setup-history'),
    setupHistoryContainer: document.getElementById('setup-history-container'),
    setupHistoryList: document.getElementById('setup-history-list'),
    viewLastBtn: document.getElementById('btn-view-last-result'),
};


const formatTime = (s) => `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`;

const renderMath = (element = document.body) => {
    if (typeof renderMathInElement !== 'undefined') {
        renderMathInElement(element, {
            delimiters: [
                {left: "$$", right: "$$", display: true},
                {left: "\\[", right: "\\]", display: true},
                {left: "$", right: "$", display: false},
                {left: "\\(", right: "\\)", display: false}
            ],
            throwOnError: false
        });
    }
};


const renderQuestion = () => {
    const q = questions[currentIndex];
    
    quizEls.qText.innerHTML = q.question;

    const existingImg = document.getElementById('current-quiz-image');
    if (existingImg) existingImg.remove();


if (q.imageUrl) {
    const imgContainer = document.createElement('div');
    imgContainer.id = 'current-quiz-image';
    imgContainer.className = "w-full flex justify-center my-4";
    
    imgContainer.innerHTML = `
        <div id="trigger-zoom" class="relative group w-full max-w-lg mx-auto bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 cursor-zoom-in transition-all hover:shadow-md">
            <img src="${q.imageUrl}" alt="Question" class="w-full h-32 md:h-48 object-contain mx-auto p-2">
            <div class="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
                 <div class="bg-white/90 dark:bg-slate-800/90 text-primary px-4 py-2 rounded-full text-xs font-bold shadow-sm backdrop-blur-sm">
                    <i class="fa-solid fa-expand mr-2"></i> Click to Zoom Image
                 </div>
            </div>
        </div>
    `;
    quizEls.qText.parentNode.insertBefore(imgContainer, quizEls.qText.nextSibling);

    document.getElementById('trigger-zoom').addEventListener('click', function() {
        window.openImageZoom(q.imageUrl);
    });
}

    const setOffset = parseInt(quizEls.setupSet.value.split('-')[0]) || 0; 
    document.getElementById('question-meta').textContent = `Question ${currentIndex+1} of ${questions.length}`;
    
    quizEls.progressBar.style.width = `${((currentIndex+1)/questions.length)*100}%`;
    quizEls.opts.innerHTML = '';

    const isChecked = checkedQuestions[q.id];
    const userAnswer = userAnswers[q.id];

    ['A','B','C','D'].forEach(key => {
        const btn = document.createElement('button');
        const isSel = userAnswer === key;
        
        let btnClass = "option-btn w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 ";
        let badgeClass = "w-8 h-8 rounded-full flex items-center justify-center ";
        
        if (currentMode === 'quiz' && isChecked) {
             if (key === q.answer) {
                btnClass += "border-green-500 bg-green-50 dark:bg-green-900/20 ring-1 ring-green-500 ";
                badgeClass += "bg-green-500 text-white";
            } else if (isSel && key !== q.answer) {
                btnClass += "border-red-500 bg-red-50 dark:bg-red-900/20 ring-1 ring-red-500 ";
                badgeClass += "bg-red-500 text-white";
            } else {
                btnClass += "border-slate-200 dark:border-slate-600 opacity-60 ";
                badgeClass += "bg-slate-100 dark:bg-slate-700";
            }
        } else {
             if (isSel) {
                btnClass += "border-primary bg-indigo-50 dark:bg-primary/20 ring-1 ring-primary ";
                badgeClass += "bg-primary text-white";
            } else {
                btnClass += "border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 hover:border-primary/50 ";
                badgeClass += "bg-slate-100 dark:bg-slate-700";
            }
        }

        btn.className = btnClass;
        btn.disabled = (currentMode === 'quiz' && isChecked); 
        btn.innerHTML = `<span class="${badgeClass}">${key}</span><span class="text-lg ${isSel && !isChecked ? 'text-primary font-semibold' : 'dark:text-slate-300'}">${q.options[key]}</span>`;
        btn.onclick = () => { 
            if(!isPaused && !(currentMode === 'quiz' && isChecked)) { 
                userAnswers[q.id] = key;
                renderQuestion(); 
            }
        };
        quizEls.opts.appendChild(btn);
    });

    const existingCheckBtn = document.getElementById('check-answer-btn');
    if(existingCheckBtn) existingCheckBtn.remove();
    
    if (currentMode === 'quiz' && !isChecked) {
        const checkBtn = document.createElement('button');
        checkBtn.id = 'check-answer-btn';
        checkBtn.className = "w-full md:w-auto px-6 py-2.5 rounded-xl text-white font-medium bg-purple-600 shadow-lg shadow-purple-500/30 hover:bg-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed";
        checkBtn.innerHTML = '<i class="fa-solid fa-check-double mr-2"></i> Check Answer';
        checkBtn.disabled = !userAnswers[q.id];
        checkBtn.onclick = () => {
            checkedQuestions[q.id] = true;
            renderQuestion();
        };
        const footerDiv = document.querySelector('footer div.flex');
        quizEls.next.classList.add('hidden');
        quizEls.submit.classList.add('hidden');
        if(footerDiv) footerDiv.appendChild(checkBtn);
    } else {
        quizEls.prev.disabled = currentIndex === 0;
        if (currentIndex === questions.length - 1) {
            quizEls.next.classList.add('hidden');
            quizEls.submit.classList.remove('hidden');
        } else {
            quizEls.next.classList.remove('hidden');
            quizEls.submit.classList.add('hidden');
        }
    }
    renderMath(quizEls.container); 
};


const startTimer = () => {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if(!isPaused && timeLeft > 0) {
            timeLeft--;
            quizEls.time.textContent = formatTime(timeLeft);
        } else if(timeLeft <= 0) {
            submitQuiz(true);
        }
    }, 1000);
};

const togglePause = (state) => {
    isPaused = state;
    if(isPaused) {
        clearInterval(timerInterval);
        document.getElementById('pause-btn').classList.add('hidden'); 
        document.getElementById('resume-btn').classList.remove('hidden');
        document.getElementById('paused-overlay').classList.remove('hidden');
    } else {
        startTimer();
        document.getElementById('pause-btn').classList.remove('hidden'); 
        document.getElementById('resume-btn').classList.add('hidden');
        document.getElementById('paused-overlay').classList.add('hidden');
    }
};

const endQuizEarly = () => {
    togglePause(true); 
    if (confirm("Are you sure you want to end the quiz now and submit your current answers?")) {
        submitQuiz(false);
    } else {
        togglePause(false); 
    }
};



const loadQuiz = async (uid) => {
    quizEls.loader.classList.remove('hidden');
    
    const doc = await db.collection('quizzes').doc(uid).get();
    if(!doc.exists) {
        document.getElementById('error-text').textContent = "Quiz not found or deleted.";
        document.getElementById('error-message-area').classList.remove('hidden');
        return;
    }
    const data = doc.data();
    quizEls.title.textContent = data.title;
    quizEls.setupTitle.textContent = data.title;
    allQuestions = data.questions.map((q,i)=>({...q, id:`Q${i+1}`}));
    quizEls.setupSet.innerHTML = '';
    const setSize = 20;
    const totalQ = allQuestions.length;
    for (let i = 0; i < totalQ; i += setSize) {
        const start = i + 1;
        const end = Math.min(i + setSize, totalQ);
        const option = document.createElement('option');
        option.value = `${i}-${end}`; 
        option.textContent = `Questions ${start} - ${end}`;
        quizEls.setupSet.appendChild(option);
    }
    if (totalQ > setSize) {
        const allOpt = document.createElement('option');
        allOpt.value = `0-${totalQ}`;
        allOpt.textContent = `All Questions (${totalQ})`;
        quizEls.setupSet.appendChild(allOpt);
    }

    quizEls.setupTimer.innerHTML = '';
    const maxDurationMin = data.durationMinutes || Math.ceil(totalQ * 1); 
    
    for (let t = 5; t <= maxDurationMin; t += 5) {
        const option = document.createElement('option');
        option.value = t;
        option.textContent = `${t} Minutes`;
        if (t === 20 || t === maxDurationMin) option.selected = true; 
        quizEls.setupTimer.appendChild(option);
    }
    if (maxDurationMin % 5 !== 0) {
         const maxOpt = document.createElement('option');
         maxOpt.value = maxDurationMin;
         maxOpt.textContent = `${maxDurationMin} Minutes (Max)`;
         maxOpt.selected = true;
         quizEls.setupTimer.appendChild(maxOpt);
    }

    const prog = await db.collection('user_progress').doc(CURRENT_USER_ID).collection('saved_quizzes').doc(uid).get();
    
    quizEls.loader.classList.add('hidden');
    
    if(prog.exists) {
        quizEls.resumeModal.classList.remove('hidden');
        document.getElementById('btn-resume-attempt').onclick = () => {
            const s = prog.data();
            questions = allQuestions;
            currentIndex = s.currentIndex; 
            timeLeft = s.timeLeft; 
            userAnswers = s.userAnswers;
            startQuizSession();
        };
        document.getElementById('btn-restart-attempt').onclick = async () => {
            await prog.ref.delete(); 
            quizEls.resumeModal.classList.add('hidden');
            quizEls.setupModal.classList.remove('hidden');
        };
    } else {
        quizEls.setupModal.classList.remove('hidden');
    }

    quizEls.startBtn.onclick = () => {
        const modeInput = document.querySelector('input[name="quiz_mode"]:checked');
        currentMode = modeInput ? modeInput.value : 'test';
        const selectedTime = parseInt(quizEls.setupTimer.value);
        timeLeft = selectedTime * 60;
        const rangeVal = quizEls.setupSet.value; // e.g. "0-20"
        const [start, end] = rangeVal.split('-').map(Number);
        
        questions = allQuestions.slice(start, end);
        currentIndex = 0;
        userAnswers = {};
        checkedQuestions = {};
        startQuizSession();
    };
};

const startQuizSession = () => {
    document.querySelectorAll('.fixed').forEach(m => { if(m.id!=='loading-screen') m.classList.add('hidden') });
    
    quizEls.container.classList.remove('hidden');
    quizEls.time.textContent = formatTime(timeLeft);
    
    renderQuestion();
    startTimer();
    
    if (typeof setupAntiCheatingMeasures === 'function') {
        setupAntiCheatingMeasures();
    }
    
    history.pushState(null, null, location.href);
    window.onpopstate = () => {
        if(!document.getElementById('result-box').classList.contains('hidden')) {
             window.location.replace('/index.html');
        } else { 
            togglePause(true); 
            quizEls.exitModal.classList.remove('hidden'); 
            history.pushState(null, null, location.href); 
        }
    };
};

const saveProgress = async () => {
    await db.collection('user_progress').doc(CURRENT_USER_ID).collection('saved_quizzes').doc(currentQuizId).set({
        currentIndex, timeLeft, userAnswers, lastSaved: firebase.firestore.FieldValue.serverTimestamp()
    });
};

quizEls.prev.onclick = () => { if(currentIndex>0) { currentIndex--; renderQuestion(); }};
quizEls.next.onclick = () => { if(currentIndex<questions.length-1) { currentIndex++; renderQuestion(); }};
quizEls.submit.onclick = () => submitQuiz(false); 
document.getElementById('pause-btn').onclick = () => togglePause(true);
document.getElementById('resume-btn').onclick = () => togglePause(false);
document.getElementById('end-quiz-early-btn').onclick = endQuizEarly;

quizEls.saveBtn.onclick = () => {
     togglePause(true);
     quizEls.exitModal.classList.remove('hidden');
     history.pushState(null, null, location.href);
};

document.getElementById('modal-cancel').onclick = () => { 
    quizEls.exitModal.classList.add('hidden'); 
    togglePause(false); 
};
document.getElementById('modal-save').onclick = async () => {
    await saveProgress();
    window.onpopstate = null; 
    window.location.replace('/index.html');
};

window.toggleModeDescription = (mode) => {
    console.log("Selected Mode:", mode);
};

const themeEls = {
    themeToggle: document.getElementById('theme-toggle'),
    sunIcon: document.getElementById('sun-icon'),
    moonIcon: document.getElementById('moon-icon'),
};
function initTheme() {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        themeEls.sunIcon.classList.remove('hidden');
        themeEls.moonIcon.classList.add('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        themeEls.sunIcon.classList.add('hidden');
        themeEls.moonIcon.classList.remove('hidden');
    }
}
themeEls.themeToggle.onclick = () => {
    document.documentElement.classList.toggle('dark');
    localStorage.theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    initTheme();
};
initTheme();



const quizContainer = document.getElementById('quiz-container'); 
let focusLostDetected = false;
let focusLossCount = 0;
const maxFocusLosses = 3; 

function showAntiCheatAlert(message, isCritical = false) {
    console.warn(`Anti-Cheat Alert: ${message}`);
    
    const alertId = 'anticheat-alert';
    const existingAlert = document.getElementById(alertId);
    if (existingAlert) existingAlert.remove();
    
    const alertEl = document.createElement('div');
    alertEl.id = alertId;
    alertEl.className = `fixed top-0 left-0 right-0 p-4 text-center z-[1000] font-bold shadow-lg transition-transform duration-300 transform 
        ${isCritical ? 'bg-red-600 text-white' : 'bg-yellow-400 text-slate-800'}`;
    alertEl.textContent = message;
    
    document.body.appendChild(alertEl);
    
    if (!isCritical) {
        setTimeout(() => {
            if (document.getElementById(alertId)) {
                document.getElementById(alertId).remove();
            }
        }, 4000);
    }
}

function handleFocusLoss() {
    if (!isPaused && !quizContainer.classList.contains('hidden')) {
        focusLossCount++;
        togglePause(true);

        const overlay = document.getElementById('violation-overlay');
        const msg = document.getElementById('violation-msg');
        msg.textContent = `You left the quiz screen. Violation ${focusLossCount}/${maxFocusLosses}.`;
        overlay.classList.remove('hidden');

        document.getElementById('close-violation').onclick = () => {
            overlay.classList.add('hidden');
            if (focusLossCount < maxFocusLosses) {
                togglePause(false);
            } else {
                submitQuiz(true);
            }
        };
    }
}

function handleFocusReturn() {
    if (focusLostDetected) {
        showAntiCheatAlert("Quiz window regained focus. Click 'Resume' to restart the timer.", false);
        focusLostDetected = false;
    }
}

function handleVisibilityChange() {
    if (document.hidden) {
        handleFocusLoss();
    } else {
        handleFocusReturn();
    }
}


quizEls.viewLastBtn.onclick = async () => {
    if (!CURRENT_USER_ID || !currentQuizId) return;

    const originalText = quizEls.viewLastBtn.innerHTML;
    quizEls.viewLastBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Loading...';
    quizEls.viewLastBtn.disabled = true;

    try {
        const snapshot = await db.collection('user_results')
            .doc(CURRENT_USER_ID)
            .collection('attempts')
            .where('quizId', '==', currentQuizId)
            .orderBy('timestamp', 'desc')
            .limit(1)
            .get();

        if (snapshot.empty) {
            alert("No previous results found for this quiz.");
            quizEls.viewLastBtn.innerHTML = originalText;
            quizEls.viewLastBtn.disabled = false;
            return;
        }

        const lastAttemptId = snapshot.docs[0].id;
        
        quizEls.setupModal.classList.add('hidden');

        if(quizEls.container) quizEls.container.classList.add('hidden');

        document.getElementById('result-box').classList.remove('hidden'); 

        if (typeof loadAttemptDetails === 'function') {
            loadAttemptDetails(lastAttemptId);
        } else {
            console.error("Critical: loadAttemptDetails function not found in result.js");
        }

    } catch (e) {
        console.error("Error redirecting to result:", e);
        alert("Could not load result. Please ensure the Database Index is created.");
    } finally {
        quizEls.viewLastBtn.innerHTML = originalText;
        quizEls.viewLastBtn.disabled = false;
    }
};



function setupAntiCheatingMeasures() {
    document.addEventListener('contextmenu', e => e.preventDefault());

    document.addEventListener('copy', (e) => {
        e.preventDefault();
        showAntiCheatAlert("Copying is prohibited!", true);
    });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            handleFocusLoss();
        }
    });

    window.addEventListener('keyup', (e) => {
        if (e.key === 'PrintScreen') {
            navigator.clipboard.writeText(''); 
            showAntiCheatAlert("Screenshots are discouraged.", true);
        }
    });
}

window.openImageZoom = function(src) {
    let modal = document.getElementById('img-zoom-modal');
    
    if (!modal) {
        const modalHtml = `
        <div id="img-zoom-modal" class="fixed inset-0 z-[10000] hidden bg-black/95 backdrop-blur-md flex flex-col items-center justify-center">
            <div class="absolute top-4 right-4 flex gap-3 z-[10001]">
                <button id="z-down" title="Download" class="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"><i class="fa-solid fa-download"></i></button>
                
                <button id="z-rotate" title="Rotate" class="p-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition"><i class="fa-solid fa-rotate"></i></button>
                
                <button id="z-in" title="Zoom In" class="p-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition"><i class="fa-solid fa-plus"></i></button>
                <button id="z-out" title="Zoom Out" class="p-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition"><i class="fa-solid fa-minus"></i></button>
                
                <button onclick="closeZoomModal()" class="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition shadow-lg"><i class="fa-solid fa-xmark"></i></button>
            </div>

            <div class="w-full h-full flex items-center justify-center overflow-hidden">
                <img id="img-zoom-target" src="" class="transition-transform duration-200" style="transform: scale(1) rotate(0deg);">
            </div>
        </div>`;
        
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        modal = document.getElementById('img-zoom-modal');
        
        let currentScale = 1;
        let currentRotation = 0;

        const update = () => {
            document.getElementById('img-zoom-target').style.transform = `scale(${currentScale}) rotate(${currentRotation}deg)`;
        };

        document.getElementById('z-in').onclick = () => { currentScale += 0.2; update(); };
        document.getElementById('z-out').onclick = () => { if(currentScale > 0.5) currentScale -= 0.2; update(); };

        document.getElementById('z-rotate').onclick = () => { 
            currentRotation += 90; 
            update(); 
        };

        // Download
        document.getElementById('z-down').onclick = () => {
            const link = document.createElement('a');
            link.href = document.getElementById('img-zoom-target').src;
            link.download = 'quiz-image.jpg';
            link.click();
        };
    }

    const targetImg = document.getElementById('img-zoom-target');
    targetImg.src = src;
    targetImg.style.transform = "scale(1) rotate(0deg)"; 
    modal.classList.remove('hidden');
};

window.closeZoomModal = function() {
    document.getElementById('img-zoom-modal').classList.add('hidden');
};

