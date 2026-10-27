(function() {
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('neelaxmi-theme');
  if (savedTheme) root.setAttribute('data-theme', savedTheme);
  
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('neelaxmi-theme', next);
      document.dispatchEvent(new CustomEvent('neelaxmi-theme-change', { detail: { theme: next } }));
    });
  }
  
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', open);
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }));
  }
})();

// Referral links can point at any landing page: remember ?ref=CODE and pass it on to the app.
(function() {
  const ref = (new URLSearchParams(location.search).get('ref') || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (!ref) return;
  document.querySelectorAll('a[href="pyq.html"]').forEach(a => { a.href = 'pyq.html?ref=' + ref; });
})();
