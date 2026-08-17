(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector('[data-theme-toggle]');
  const menuButton = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav]');

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || (!savedTheme && matchMedia('(prefers-color-scheme: dark)').matches)) {
    root.dataset.theme = 'dark';
  }

  const updateThemeLabel = () => {
    if (!themeButton) return;
    const dark = root.dataset.theme === 'dark';
    themeButton.textContent = dark ? '☀' : '☾';
    themeButton.setAttribute('aria-label', dark ? 'Use light theme' : 'Use dark theme');
  };

  themeButton?.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', root.dataset.theme);
    updateThemeLabel();
  });

  menuButton?.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(open));
  });

  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }));

  updateThemeLabel();
  document.querySelectorAll('[data-year]').forEach((node) => { node.textContent = new Date().getFullYear(); });
})();

