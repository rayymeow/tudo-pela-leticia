(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const DAY = 24 * 60 * 60 * 1000;

  // Friendship counter and birthday countdown use the visitor's local calendar date.
  const friendshipStart = new Date(2022, 4, 5);
  const friendshipOutput = $('#friendship-days');
  const birthdayOutput = $('#birthday-countdown');

  function updateDates() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const days = Math.max(0, Math.floor((today - friendshipStart) / DAY));
    friendshipOutput.textContent = new Intl.NumberFormat('pt-BR').format(days);

    let nextBirthday = new Date(today.getFullYear(), 10, 26);
    if (today > nextBirthday) nextBirthday = new Date(today.getFullYear() + 1, 10, 26);
    const remaining = Math.round((nextBirthday - today) / DAY);
    if (today.getMonth() === 10 && today.getDate() === 26) {
      birthdayOutput.textContent = 'IT IS YOUR DAY! ♡';
    } else if (remaining === 1) {
      birthdayOutput.textContent = '1 DAY UNTIL THE PARTY';
    } else {
      birthdayOutput.textContent = `${remaining} DAYS UNTIL THE PARTY`;
    }
  }
  updateDates();
  window.setInterval(updateDates, 60_000);

  // Scroll progress.
  const progress = $('#progress');
  function updateProgress() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const percent = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
    progress.style.width = `${Math.min(100, Math.max(0, percent))}%`;
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();

  // Toast helper.
  let toastTimer = 0;
  function toast(message) {
    const node = $('#toast');
    node.textContent = message;
    node.classList.add('show');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => node.classList.remove('show'), 2200);
  }

  // Lightbox for the photos and artwork; use the actual loaded image URL.
  const lightbox = $('#lightbox');
  const lightboxImage = $('#lightbox-image');
  const lightboxCaption = $('#lightbox-caption');

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lightboxImage.removeAttribute('src');
  }

  function openLightbox(trigger) {
    const image = trigger.matches('img') ? trigger : $('img', trigger);
    if (!image || image.classList.contains('image-failed')) return;
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt || '';
    lightboxCaption.textContent = trigger.dataset.caption || image.alt || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  $$('.image-click').forEach((node) => {
    node.addEventListener('click', (event) => {
      if (event.target.closest('button, a')) return;
      openLightbox(node);
    });
    node.setAttribute('tabindex', '0');
    node.setAttribute('role', 'button');
    node.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openLightbox(node);
      }
    });
  });

  $('#lightbox-close').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
  });

  // Letter: the paper rises from the envelope and can be closed again.
  const envelope = $('#envelope');
  const letterButton = $('#open-letter');
  letterButton.addEventListener('click', () => {
    const open = !envelope.classList.contains('open');
    envelope.classList.toggle('open', open);
    letterButton.setAttribute('aria-expanded', String(open));
    letterButton.innerHTML = open ? 'CLOSE YOUR LETTER <span>×</span>' : 'OPEN YOUR LETTER <span>↗</span>';
    toast(open ? 'uma mensagem guardada só pra você ♡' : 'a cartinha fica aqui quando quiser reler.');
  });

  // Light the birthday candles and release a small confetti/sparkle burst.
  const wishButton = $('#wish-button');
  const wishMessage = $('#wish-message');
  wishButton.addEventListener('click', () => {
    const wishes = [
      'que seu novo ciclo tenha mais viagens, risadas e conquistas. ✦',
      'que nunca faltem motivos pra comemorar você. ♡',
      'que a vida seja gentil com todos os seus planos. ✧',
      'que você se surpreenda com tudo de lindo que ainda vem.'
    ];
    wishMessage.textContent = wishes[Math.floor(Math.random() * wishes.length)];
    burst(window.innerWidth * 0.72, window.innerHeight * 0.65, 34);
    toast('wish sent into the universe ✦');
  });

  // Decorative collage shuffle: slightly re-angle the pieces without changing their layout.
  const shuffleButton = $('#shuffle-pieces');
  let shuffleCount = 0;
  shuffleButton.addEventListener('click', () => {
    shuffleCount += 1;
    $$('.collage-board .piece').forEach((piece, index) => {
      const direction = ((index + shuffleCount) % 2 === 0) ? 1 : -1;
      const degrees = (Math.random() * 3.2 + 0.8) * direction;
      piece.style.transform = `rotate(${degrees.toFixed(2)}deg) translateY(${Math.round(Math.random() * 7 - 3)}px)`;
    });
    toast('the folder got rearranged ✳');
  });

  // Small, local confetti effect built only with text glyphs; no external libraries.
  const sparkleLayer = $('#sparkle-layer');
  function burst(x, y, count = 18) {
    const glyphs = ['✦', '✧', '✳', '♡', '★'];
    for (let i = 0; i < count; i += 1) {
      const star = document.createElement('span');
      star.className = 'sparkle';
      star.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
      star.style.left = `${x + (Math.random() - .5) * 170}px`;
      star.style.top = `${y + (Math.random() - .5) * 85}px`;
      star.style.animationDelay = `${Math.random() * .22}s`;
      star.style.fontSize = `${12 + Math.random() * 17}px`;
      sparkleLayer.appendChild(star);
      window.setTimeout(() => star.remove(), 1100);
    }
  }

  // Desktop cursor glints; disabled for touch and reduced-motion preferences.
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let lastSparkle = 0;
  if (!reduceMotion) {
    window.addEventListener('pointermove', (event) => {
      if (event.pointerType !== 'mouse') return;
      const now = Date.now();
      if (now - lastSparkle < 170) return;
      lastSparkle = now;
      if (Math.random() > .55) return;
      const glint = document.createElement('span');
      glint.className = 'sparkle';
      glint.textContent = Math.random() > .5 ? '✧' : '✦';
      glint.style.left = `${event.clientX}px`;
      glint.style.top = `${event.clientY}px`;
      sparkleLayer.appendChild(glint);
      window.setTimeout(() => glint.remove(), 850);
    }, { passive: true });
  }

  // Failed external images never leave a broken-image icon or collapse the composition.
  $$('img').forEach((image) => {
    const fallback = () => {
      if (image.classList.contains('image-failed')) return;
      image.classList.add('image-failed');
      const parent = image.parentElement;
      if (!parent) return;
      parent.classList.add('media-failed');
      if (parent.classList.contains('hero-photo-window')) return;
      if (!parent.querySelector('.media-fallback')) {
        const label = document.createElement('span');
        label.className = 'media-fallback';
        label.textContent = image.alt || 'imagem temporariamente indisponível';
        parent.appendChild(label);
      }
    };
    image.addEventListener('error', fallback, { once: true });
    if (image.complete && image.naturalWidth === 0) fallback();
  });
})();
