(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  // Friendship counter: May 5, 2022 -> current local date.
  const friendshipStart = new Date(2022, 4, 5);
  const friendshipDays = $('#friendship-days');
  const birthdayCount = $('#birthday-count');
  const birthdayCaption = $('#birthday-caption');

  function updateCounters() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const days = Math.max(0, Math.floor((today - friendshipStart) / 86400000));
    friendshipDays.textContent = new Intl.NumberFormat('pt-BR').format(days);

    let nextBirthday = new Date(today.getFullYear(), 10, 26);
    if (today > nextBirthday) nextBirthday = new Date(today.getFullYear() + 1, 10, 26);
    const daysLeft = Math.ceil((nextBirthday - today) / 86400000);
    if (today.getMonth() === 10 && today.getDate() === 26) {
      birthdayCount.innerHTML = 'É HOJE <small>♡</small>';
      birthdayCaption.textContent = '26.11 · HAPPY BIRTHDAY!';
    } else {
      birthdayCount.innerHTML = `${String(daysLeft).padStart(2, '0')} <small>${daysLeft === 1 ? 'day' : 'days'}</small>`;
      birthdayCaption.textContent = `26.11.${nextBirthday.getFullYear()} · your day!`;
    }
  }
  updateCounters();
  window.setInterval(updateCounters, 60_000);

  // Small custom toast for stickers / interactions.
  let toastTimer;
  function toast(message) {
    const el = $('#toast');
    el.textContent = message;
    el.classList.add('show');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => el.classList.remove('show'), 2300);
  }

  // Lightbox: each character image can be opened independently.
  const lightbox = $('#lightbox');
  const lightboxImage = $('#lightbox-image');
  const lightboxCaption = $('#lightbox-caption');
  const closeLightbox = () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lightboxImage.removeAttribute('src');
  };
  function openLightbox(trigger) {
    const img = trigger.matches('img') ? trigger : $('img', trigger);
    if (!img || !img.currentSrc && !img.src) return;
    lightboxImage.src = img.currentSrc || img.src;
    lightboxImage.alt = img.alt || '';
    lightboxCaption.textContent = trigger.dataset.caption || img.alt || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  $$('.js-lightbox').forEach((trigger) => {
    trigger.addEventListener('click', () => openLightbox(trigger));
    if (trigger.matches('[tabindex]')) {
      trigger.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openLightbox(trigger);
        }
      });
    }
  });
  $('#lightbox-close').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (event) => { if (event.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeLightbox(); });

  // Reveal the letter and move the paper out of its envelope.
  const envelope = $('#envelope');
  const openLetterButton = $('#open-letter');
  openLetterButton.addEventListener('click', () => {
    const isOpen = !envelope.classList.contains('open');
    envelope.classList.toggle('open', isOpen);
    openLetterButton.setAttribute('aria-expanded', String(isOpen));
    openLetterButton.innerHTML = isOpen ? 'CLOSE YOUR LETTER <span>×</span>' : 'OPEN YOUR LETTER <span>↗</span>';
    toast(isOpen ? 'uma cartinha guardada só pra você ♡' : 'ela continua aqui quando você quiser reler.');
  });

  // Little reminder shuffle, written from the details the user shared.
  const reminders = [
    'sua risada é uma das minhas coisas favoritas no mundo. ♡',
    'eu chorei de felicidade pela sua viagem porque você merece viver coisas lindas.',
    'até um olhar de crush vira acontecimento histórico quando eu conto pra você.',
    'obrigada por ouvir todos os surtos amorosos. TODOS.',
    'você é minha primeira opção, inclusive nas coisas mais bobas.',
    'não esquece: eu tenho muito orgulho de você.',
    'que o mundo te devolva toda a alegria que você espalha.'
  ];
  let previousReminder = -1;
  $('#little-surprise').addEventListener('click', () => {
    let index = Math.floor(Math.random() * reminders.length);
    if (reminders.length > 1) while (index === previousReminder) index = Math.floor(Math.random() * reminders.length);
    previousReminder = index;
    $('#surprise-output').textContent = reminders[index];
    toast('little reminder unlocked ✦');
  });

  // Image failures are handled in place; stickers can disappear without creating broken boxes.
  $$('img').forEach((img) => {
    const fail = () => {
      img.classList.add('image-missing');
      img.alt = img.alt || 'imagem indisponível';
      const isSticker = img.classList.contains('cutout-cat');
      const holder = img.closest('figure, .manga-cover, .goku-art-wrap, .cat-sticker-cluster, .ticket-stack');
      if (holder && !isSticker && !holder.querySelector('.media-fallback')) {
        holder.classList.add('has-missing-image');
        const fallback = document.createElement('span');
        fallback.className = 'media-fallback';
        fallback.textContent = 'imagem indisponível por enquanto ♡';
        holder.appendChild(fallback);
      }
    };
    img.addEventListener('error', fail, { once: true });
    if (img.complete && img.naturalWidth === 0) fail();
  });

  // Floating stickers react to taps; no cropping or fixed-height behavior is applied to PNG cutouts.
  $$('.cutout-cat').forEach((sticker) => {
    sticker.addEventListener('click', () => {
      sticker.classList.remove('sticker-wiggle');
      void sticker.offsetWidth;
      sticker.classList.add('sticker-wiggle');
      toast('certified friendship sticker. ♡');
      window.setTimeout(() => sticker.classList.remove('sticker-wiggle'), 520);
    });
  });

  // Desktop-only sparkles, throttled to avoid excessive DOM work.
  const sparkles = $('#cursor-sparkles');
  let lastSparkle = 0;
  window.addEventListener('pointermove', (event) => {
    if (event.pointerType !== 'mouse') return;
    const now = Date.now();
    if (now - lastSparkle < 150) return;
    lastSparkle = now;
    const sparkle = document.createElement('span');
    sparkle.className = 'cursor-sparkle';
    sparkle.textContent = Math.random() > .5 ? '✦' : '✧';
    sparkle.style.left = `${event.clientX}px`;
    sparkle.style.top = `${event.clientY}px`;
    sparkles.appendChild(sparkle);
    window.setTimeout(() => sparkle.remove(), 850);
  }, { passive: true });
})();
