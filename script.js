(function () {
  const home = document.getElementById('home');
  const bandsWrap = document.getElementById('bands');
  const bands = Array.from(document.querySelectorAll('.band'));
  const projectViews = Array.from(document.querySelectorAll('.project-view'));
  const floatingBack = document.getElementById('floating-back');
  const TRANSITION_MS = 550;

  let isAnimating = false;

  function safeSetHash(hash) {
    // history.pushState throws a SecurityError in some browsers when the
    // page is opened directly as a file:// URL. Fall back to a plain
    // location.hash assignment (which also creates a history entry) if so.
    try {
      history.pushState({ project: hash }, '', hash ? '#' + hash : location.pathname);
    } catch (e) {
      if (hash) location.hash = hash;
    }
  }

  function openProject(id, skipBandAnim) {
    if (isAnimating) return;
    const view = document.getElementById('project-' + id);
    if (!view) return;

    isAnimating = true;
    const band = bands.find(b => b.dataset.project === id);

    if (band && !skipBandAnim) {
      band.classList.add('is-active');
      bandsWrap.classList.add('is-transitioning');
    }

    // Set the background directly (not via a CSS custom property) so it
    // can't silently fail to apply.
    const color = view.dataset.color || '#ffffff';
    view.style.backgroundColor = color;

    document.body.classList.add('on-inner');

    window.setTimeout(() => {
      home.classList.add('is-hidden');
      view.classList.add('is-visible');
      view.scrollTop = 0;
      isAnimating = false;
    }, skipBandAnim ? 0 : TRANSITION_MS);

    safeSetHash(id);
  }

  function closeProject(view) {
    if (isAnimating) return;
    isAnimating = true;
    view.classList.remove('is-visible');
    home.classList.remove('is-hidden');
    bandsWrap.classList.remove('is-transitioning');
    bands.forEach(b => b.classList.remove('is-active'));
    document.body.classList.remove('on-inner');

    window.setTimeout(() => { isAnimating = false; }, TRANSITION_MS);

    safeSetHash('');
  }

  bands.forEach(band => {
    band.addEventListener('click', () => openProject(band.dataset.project));
  });

  if (floatingBack) {
    floatingBack.addEventListener('click', (e) => {
      e.preventDefault();
      const openView = projectViews.find(v => v.classList.contains('is-visible'));
      if (openView) closeProject(openView);
    });
  }

  window.addEventListener('popstate', () => {
    const openView = projectViews.find(v => v.classList.contains('is-visible'));
    const hashId = location.hash.replace('#', '');
    if (!hashId && openView) {
      closeProject(openView);
    } else if (hashId && (!openView || openView.id !== 'project-' + hashId)) {
      openProject(hashId, true);
    }
  });

  // deep link support on load
  if (location.hash) {
    openProject(location.hash.replace('#', ''), true);
  }
})();
