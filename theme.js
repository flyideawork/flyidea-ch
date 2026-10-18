(() => {
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  let saved = null;
  try { saved = localStorage.getItem('flyidea-theme'); } catch {}
  const apply = mode => {
    document.documentElement.dataset.theme = mode;
    document.documentElement.style.colorScheme = mode;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', mode === 'dark' ? '#13131e' : '#fcf9ff');
    const toggle = document.querySelector('.theme-toggle');
    if (toggle) {
      toggle.setAttribute('aria-pressed', String(mode === 'dark'));
      toggle.setAttribute('aria-label', mode === 'dark' ? 'Hellen Modus aktivieren' : 'Dunklen Modus aktivieren');
      toggle.title = mode === 'dark' ? 'Zum hellen Design wechseln' : 'Zum dunklen Design wechseln';
    }
  };
  apply(saved === 'dark' || saved === 'light' ? saved : system.matches ? 'dark' : 'light');
  document.addEventListener('DOMContentLoaded', () => {
    apply(document.documentElement.dataset.theme);
    document.querySelector('.theme-toggle')?.addEventListener('click', () => {
      saved = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      apply(saved);
      try { localStorage.setItem('flyidea-theme', saved); } catch {}
    });
  });
  system.addEventListener('change', () => { if (!saved) apply(system.matches ? 'dark' : 'light'); });
})();
