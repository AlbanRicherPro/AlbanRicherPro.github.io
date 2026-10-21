export const INTRO_SESSION_KEY = "portfolio-intro-seen-v1";

// Runs before hydration so returning visitors never see an overlay flash.
// The timeout also reveals the page if hydration or a font download fails.
export const introBootstrap = `(() => {
  const root = document.documentElement;
  try {
    const theme = localStorage.getItem('portfolio-theme');
    if (theme === 'light' || theme === 'dark') root.dataset.theme = theme;
  } catch {}
  let seen = false;
  try { seen = sessionStorage.getItem('${INTRO_SESSION_KEY}') === '1'; } catch {}
  const navigation = performance.getEntriesByType('navigation')[0];
  const home = !location.hash || location.hash === '#home';
  if (location.pathname !== '/' || !home || seen || navigation?.type === 'back_forward') return;
  root.dataset.intro = 'pending';
  window.setTimeout(() => {
    if (root.dataset.intro === 'pending' || root.dataset.intro === 'running') {
      root.dataset.intro = 'done';
      window.dispatchEvent(new Event('portfolio-intro-cancel'));
    }
  }, 4800);
})();`;
