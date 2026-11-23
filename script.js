(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const pages = $$('.page');
  const dots = $$('.dot');
  const previous = $('#previous-page');
  const next = $('#next-page');
  const counter = $('#page-counter');
  const indexModal = $('#index-modal');
  let currentPage = 0;
  let toastTimer;

  function showToast(message) {
    const toast = $('#toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('show'), 1900);
  }

  function goToPage(target) {
    const nextPage = Math.max(0, Math.min(pages.length - 1, Number(target)));
    if (!Number.isInteger(nextPage) || nextPage === currentPage) return;
    const oldPage = pages[currentPage];
    oldPage.classList.remove('is-active');
    oldPage.classList.add('turn-out');
    oldPage.hidden = false;
    window.setTimeout(() => {
      oldPage.classList.remove('turn-out');
      oldPage.hidden = true;
    }, 240);
    currentPage = nextPage;
    pages[currentPage].hidden = false;
    pages[currentPage].classList.add('is-active');
    dots.forEach((dot, i) => {
      const active = i === currentPage;
      dot.classList.toggle('active', active);
      dot.setAttribute('aria-current', active ? 'page' : 'false');
    });
    previous.disabled = currentPage === 0;
    next.disabled = currentPage === pages.length - 1;
    counter.textContent = `${String(currentPage + 1).padStart(2, '0')} / ${String(pages.length).padStart(2, '0')}`;
    $('#book').scrollIntoView({ behavior: 'smooth', block: 'start' });
    closeIndex();
  }

  function closeIndex() {
    indexModal.classList.remove('open');
    indexModal.setAttribute('aria-hidden', 'true');
  }

  previous.addEventListener('click', () => goToPage(currentPage - 1));
  next.addEventListener('click', () => goToPage(currentPage + 1));
  $$('[data-goto]').forEach((button) => button.addEventListener('click', () => goToPage(button.dataset.goto)));
  $('#open-index').addEventListener('click', () => {
    indexModal.classList.add('open');
    indexModal.setAttribute('aria-hidden', 'false');
  });
  $('#close-index').addEventListener('click', closeIndex);
  indexModal.addEventListener('click', (event) => { if (event.target === indexModal) closeIndex(); });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeIndex();
    if (indexModal.classList.contains('open')) return;
    if (event.key === 'ArrowRight') goToPage(currentPage + 1);
    if (event.key === 'ArrowLeft') goToPage(currentPage - 1);
  });

  // Contador de dias desde 05/05/2022 e aniversário em 26/11.
  const friendshipStart = new Date(2022, 4, 5);
  function updateCounters() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const days = Math.max(0, Math.floor((today - friendshipStart) / 86400000));
    $('#friendship-days').textContent = new Intl.NumberFormat('pt-BR').format(days);
    let year = today.getFullYear();
    let birthday = new Date(year, 10, 26);
    if (today > birthday) birthday = new Date(++year, 10, 26);
    const left = Math.max(0, Math.ceil((birthday - today) / 86400000));
    const count = $('#birthday-count');
    const caption = $('#birthday-caption');
    if (today.getMonth() === 10 && today.getDate() === 26) {
      count.innerHTML = 'É HOJE <small>♡</small>';
      caption.textContent = '26.11 · HAPPY BIRTHDAY!';
    } else {
      count.innerHTML = `${String(left).padStart(2, '0')} <small>${left === 1 ? 'dia' : 'dias'}</small>`;
      caption.textContent = `26.11.${year} · o seu dia`;
    }
  }
  updateCounters();
  window.setInterval(updateCounters, 60000);

  // O envelope abre uma carta real, escrita especialmente para ela.
  $('#open-letter').addEventListener('click', () => {
    const envelope = $('#envelope');
    const content = $('#letter-content');
    const prompt = $('#letter-prompt');
    const button = $('#open-letter');
    const opening = !envelope.classList.contains('open');
    envelope.classList.toggle('open', opening);
    content.hidden = !opening;
    prompt.hidden = opening;
    button.textContent = opening ? 'CLOSE THE LETTER ×' : 'OPEN THE LETTER ↗';
    if (opening) showToast('uma cartinha feita com o coração ♡');
  });

  // Erros de carregamento de fotos não deixam espaços vazios: entram fundos com a legenda do cartão.
  $$('img').forEach((img) => {
    const parent = img.parentElement;
    const fail = () => {
      parent.classList.add('image-failed');
      if (!parent.querySelector('.image-placeholder')) {
        const placeholder = document.createElement('span');
        placeholder.className = 'image-placeholder';
        placeholder.textContent = img.alt || '♡';
        parent.appendChild(placeholder);
      }
    };
    img.addEventListener('error', fail, { once: true });
    if (img.complete && img.naturalWidth === 0) fail();
  });

  // Adesivos e pequenos detalhes respondem ao toque/clique.
  $$('.cover-sticker, .goku-doodle, .cat-stamp, .extra-id, .final-stamp').forEach((sticker) => {
    sticker.tabIndex = 0;
    sticker.setAttribute('role', 'button');
    sticker.setAttribute('aria-label', 'Adesivo interativo');
    const wiggle = () => {
      sticker.animate([
        { transform: 'rotate(-12deg) scale(.85)' },
        { transform: 'rotate(13deg) scale(1.18)' },
        { transform: 'rotate(0) scale(1)' }
      ], { duration: 480, easing: 'cubic-bezier(.2,.8,.2,1)' });
      showToast(['✦ um brilho extra pra você', '♡ só mais um lembrete: você é incrível', 'saturn says hi ✧'][Math.floor(Math.random() * 3)]);
    };
    sticker.addEventListener('click', wiggle);
    sticker.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); wiggle(); } });
  });

  // Brilhinhos discretos acompanham o cursor no desktop.
  const glints = $('#cursor-glints');
  let lastGlint = 0;
  window.addEventListener('pointermove', (event) => {
    if (event.pointerType !== 'mouse') return;
    const now = Date.now();
    if (now - lastGlint < 110) return;
    lastGlint = now;
    const el = document.createElement('span');
    el.className = 'cursor-glint';
    el.textContent = Math.random() > .5 ? '✦' : '✧';
    el.style.left = `${event.clientX}px`;
    el.style.top = `${event.clientY}px`;
    glints.appendChild(el);
    window.setTimeout(() => el.remove(), 900);
  }, { passive: true });

  // Swipe simples para folhear em telas touch.
  let touchStartX = null;
  $('#book').addEventListener('touchstart', (event) => { touchStartX = event.changedTouches[0].screenX; }, { passive: true });
  $('#book').addEventListener('touchend', (event) => {
    if (touchStartX === null) return;
    const distance = event.changedTouches[0].screenX - touchStartX;
    if (Math.abs(distance) > 65) goToPage(currentPage + (distance < 0 ? 1 : -1));
    touchStartX = null;
  }, { passive: true });
})();
