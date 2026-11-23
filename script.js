(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const friendshipStart = new Date(2022, 4, 5, 0, 0, 0);
  const birthdayMonth = 10; // November (0-based)
  const birthdayDay = 26;

  const pad = (number) => String(number).padStart(2, '0');
  const formatNumber = (number) => new Intl.NumberFormat('pt-BR').format(number);

  function updateCounters() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const started = new Date(friendshipStart.getFullYear(), friendshipStart.getMonth(), friendshipStart.getDate());
    const days = Math.max(0, Math.floor((today - started) / 86400000));
    const friendshipEl = $('#friendship-days');
    if (friendshipEl) friendshipEl.textContent = formatNumber(days);

    let targetYear = now.getFullYear();
    let target = new Date(targetYear, birthdayMonth, birthdayDay, 0, 0, 0);
    if (today > target) {
      targetYear += 1;
      target = new Date(targetYear, birthdayMonth, birthdayDay, 0, 0, 0);
    }

    const daysLeft = Math.max(0, Math.floor((target - today) / 86400000));
    const timer = $('#birthday-timer');
    const label = $('#birthday-label');
    const caption = $('#birthday-caption');

    if (daysLeft === 0 && today.getMonth() === birthdayMonth && today.getDate() === birthdayDay) {
      timer.innerHTML = 'É HOJE <small>♡</small>';
      if (label) label.textContent = 'o grande dia chegou';
      if (caption) caption.textContent = '26 de novembro · feliz aniversário!';
    } else {
      timer.innerHTML = `${pad(daysLeft)} <small>${daysLeft === 1 ? 'dia' : 'dias'}</small>`;
      if (label) label.textContent = 'a contagem regressiva começou';
      if (caption) caption.textContent = '26 de novembro · seu dia especial está chegando';
    }
  }

  updateCounters();
  window.setInterval(updateCounters, 1000);

  // Imagens externas: se algum site bloquear a incorporação, aparece um fallback temático.
  $$('img').forEach((img) => {
    const parent = img.closest('.photo-frame, .manga-cover, .goku-image-panel');
    if (!parent) return;
    const handleError = () => parent.classList.add('image-missing');
    img.addEventListener('error', handleError, { once: true });
    if (img.complete && img.naturalWidth === 0) handleError();
  });

  const cardDetails = {
    'dean-charlie': {
      eyebrow: '✦ supernatural · dupla improvável',
      title: 'Dean & Charlie',
      copy: 'Charlie chega com seu humor, sua inteligência e seu lado completamente nerd. Dean, que costuma esconder o carinho atrás de piadas e provocações, encontra nela uma aliada muito especial. É aquela amizade que mistura referências, coragem e lealdade.'
    },
    'finn-jake': {
      eyebrow: '✦ hora de aventura · parceria de aventuras',
      title: 'Finn & Jake',
      copy: 'Finn e Jake atravessam a Terra de Ooo juntos, enfrentando perigos, encontrando personagens estranhos e transformando qualquer dia em uma aventura. A graça está justamente em serem diferentes e, ainda assim, funcionarem tão bem como dupla.'
    },
    'kittens': {
      eyebrow: '✦ tiny besties · amizade em sua forma mais fofinha',
      title: 'dois gatinhos, zero preocupações',
      copy: 'Às vezes, amizade é só dividir o cantinho mais confortável, encostar a cabeça e aproveitar a presença de alguém. Nenhuma grande aventura necessária — só companhia boa.'
    },
    'gumball-darwin': {
      eyebrow: '✦ the amazing world of gumball · irmãos',
      title: 'Gumball & Darwin',
      copy: 'Os dois são uma bagunça ambulante, vivem se metendo em situações absurdas e nem sempre tomam as melhores decisões. Mas o carinho entre eles continua ali: uma amizade que sobrevive até aos planos mais desastrosos. A frase ao lado é um trecho da música “Your Friendship”, cantada pelos dois.'
    },
    'raven-starfire': {
      eyebrow: '✦ jovens titãs · opostos que se completam',
      title: 'Ravena & Estelar',
      copy: 'Ravena é reservada, sarcástica e muito ligada ao próprio mundo interior; Estelar é calorosa, expressiva e cheia de curiosidade. A amizade das duas mostra que não é preciso ter o mesmo jeito para existir carinho, respeito e parceria.'
    },
    'sam-dean': {
      eyebrow: '✦ supernatural · winchester family business',
      title: 'Sam & Dean',
      copy: 'Os irmãos Winchester cruzam estradas, caçam criaturas sobrenaturais e enfrentam situações que parecem impossíveis. A relação deles é o coração de Supernatural: complicada, intensa e construída em uma lealdade que continua sendo testada.'
    },
    'alma-tao': {
      eyebrow: '✦ gokurakugai · arquivo especial',
      title: 'Alma & Tao',
      copy: 'Tao é a parceira, chefe e pessoa que acolheu Alma quando ele mais precisava. Alma é impulsivo, forte e tem um apetite gigantesco; Tao costuma ser mais contida e prática. Juntos, eles resolvem casos e enfrentam Magas — mas a confiança entre os dois é o que dá força à parceria.'
    },
    'aya-mitsuki': {
      eyebrow: '✦ the guy she was interested in wasn’t a guy at all',
      title: 'Aya & Mitsuki',
      copy: 'Aya ama rock e se apaixona pela pessoa misteriosa que trabalha na loja de CDs. O que ela ainda não sabe é que essa pessoa é Mitsuki, sua colega de classe. A música aproxima as duas, enquanto Mitsuki tenta encontrar coragem para ser conhecida por inteiro.'
    },
    'veil': {
      eyebrow: '✦ veil · kotteri',
      title: 'Emma & Alexander',
      copy: 'Emma é uma jovem cega que procura um caminho para ter mais independência. Alexander, um policial, cruza seu caminho e a ajuda a encontrar trabalho como telefonista na delegacia. A história acompanha a aproximação dos dois em capítulos curtos, cheios de gestos cotidianos e delicadeza.'
    }
  };

  const memoryDialog = $('#memory-dialog');
  $$('.card-open').forEach((button) => {
    button.addEventListener('click', () => {
      const card = button.closest('[data-card]');
      const detail = cardDetails[card?.dataset.card];
      if (!detail || !memoryDialog) return;
      $('#dialog-eyebrow').textContent = detail.eyebrow;
      $('#dialog-title').textContent = detail.title;
      $('#dialog-copy').textContent = detail.copy;
      memoryDialog.showModal();
    });
  });

  // Fecha os dois modais pelos botões e ao clicar fora do conteúdo.
  $$('.dialog-close').forEach((button) => {
    button.addEventListener('click', () => button.closest('dialog')?.close());
  });
  [memoryDialog, $('#surprise-dialog')].forEach((dialog) => {
    if (!dialog) return;
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
  });

  const surpriseDialog = $('#surprise-dialog');
  $('#open-surprise')?.addEventListener('click', () => surpriseDialog?.showModal());
  $('.surprise-close')?.addEventListener('click', () => surpriseDialog?.close());

  // Abas do arquivo de Gokurakugai.
  const gokuFiles = {
    district: {
      index: 'FILE 01 / LOCATION',
      title: 'O distrito que nunca fica quieto.',
      paragraphs: [
        'Gokurakugai é um distrito urbano marcado por ruas movimentadas, criminalidade e uma sensação constante de que alguma coisa estranha está acontecendo nos arredores. Humanos e homens-fera convivem nesse espaço, mas nem todo mundo conhece o perigo que se esconde por trás dos desaparecimentos.',
        'O cenário é importante porque mistura o cotidiano — lojas, trabalhos, clientes, comida e vizinhança — com o horror sobrenatural. A história pode sair de uma conversa banal para uma situação mortal em poucos instantes.'
      ],
      callout: 'O contraste é parte do charme: um mundo visualmente cheio de personalidade, mas com ameaças bem reais escondidas nas suas sombras.'
    },
    alma: {
      index: 'FILE 02 / SUBJECT: ALMA',
      title: 'O garoto que carrega duas naturezas.',
      paragraphs: [
        'Alma é um dos protagonistas e trabalha ao lado de Tao na agência. Ele é jovem, tem uma força física fora do comum, um apetite enorme e uma personalidade bem mais impulsiva do que a de sua parceira.',
        'A informação central sobre ele é sua origem: Alma é um meio-Maga, nascido da relação entre um humano e uma dessas criaturas. Quando estava perto de se transformar completamente, foi encontrado e acolhido por Tao. Essa origem faz com que sua própria identidade esteja ligada ao conflito principal da obra.',
        'A relação de Alma com o próprio poder e com a forma como escolhe viver é um dos fios emocionais importantes da história. Ele quer provar que pode usar sua força para proteger, e não para ferir.'
      ],
      callout: 'Alma não é só “o protagonista que bate forte”: a pergunta sobre o que define alguém — origem ou escolhas — acompanha sua trajetória.'
    },
    tao: {
      index: 'FILE 03 / SUBJECT: TAO SAOTOME',
      title: 'A chefe que mantém tudo funcionando.',
      paragraphs: [
        'Tao é a outra protagonista e a pessoa que conduz a agência. Ela tem uma postura fria, prática e pouco impressionável, mas isso não significa falta de cuidado. Foi ela quem acolheu Alma e o trouxe para perto quando ele estava em perigo.',
        'Na superfície, Tao administra os trabalhos da agência e negocia com clientes. Por trás disso, participa do combate especializado contra os Magas. Sua arma de fogo usa munição preparada a partir do sangue de Alma, ligando os recursos dos dois também durante as missões.',
        'Ela costuma ser a voz mais racional da dupla, mas a relação com Alma deixa aparecer um lado protetor e afetuoso, mesmo quando esse carinho vem acompanhado de broncas.'
      ],
      callout: 'Tao é firme sem ser indiferente: boa parte do vínculo dos dois está nos cuidados que aparecem mais nas atitudes do que nas palavras.'
    },
    magas: {
      index: 'FILE 04 / THREAT: MAGA',
      title: 'Criaturas que nascem de restos humanos e animais.',
      paragraphs: [
        'Os Magas são criaturas perigosas ligadas aos corpos de humanos e animais. Eles representam uma ameaça real para os moradores do distrito e estão relacionados a desaparecimentos e ataques a pessoas.',
        'A agência de Tao e Alma recebe casos comuns, mas seu trabalho mais importante é investigar ocorrências associadas aos Magas e eliminá-los. É por isso que a dupla acaba encontrando situações que a maior parte da população nem sabe explicar.',
        'A existência de Alma, que é meio-Maga, torna o conflito mais interessante: a ameaça não é apenas externa. A obra também explora o medo, o preconceito e a dúvida sobre como lidar com alguém cuja origem está ligada ao próprio perigo.'
      ],
      callout: 'Os Magas não são apenas monstros para uma luta da semana: a existência deles conversa diretamente com a origem de Alma e com os limites entre humano e monstruoso.'
    },
    saragi: {
      index: 'FILE 05 / ORGANIZATION',
      title: 'Uma rede maior do que a própria agência.',
      paragraphs: [
        'Tao e Alma também estão ligados à organização Saragi, que atua contra os Magas. A agência funciona como uma porta de entrada para muitos casos, mas a história vai revelando outras pessoas que participam desse universo e ampliam o alcance do conflito.',
        'Entre os nomes que aparecem estão Nei, uma espadachim habilidosa, além de personagens como Tatsuomi, que circula como informante, e integrantes ligados à pesquisa e ao treinamento. Cada um acrescenta uma peça diferente à maneira como esse mundo tenta entender e combater os Magas.',
        'Os volumes mais recentes também começam a ampliar os mistérios em torno de outras figuras e do passado de alguns personagens. É uma boa parte da graça de acompanhar a série: a sensação de que sempre existe mais coisa por trás de uma missão.'
      ],
      callout: 'A dupla é o centro da história, mas Gokurakugai vai ficando maior conforme a gente conhece as pessoas que orbitam a Saragi.'
    },
    themes: {
      index: 'FILE 06 / WHY IT HITS',
      title: 'O charme está no contraste.',
      paragraphs: [
        'A obra mistura ação sobrenatural, humor, momentos cotidianos e um visual muito marcante. O distrito é cheio de textura: roupas, fachadas, objetos, comida e cenários ajudam a dar personalidade a cada capítulo.',
        'Também existe uma combinação interessante entre a dinâmica da dupla e os temas mais pesados. Tao e Alma podem estar discutindo por comida em uma página e enfrentando uma ameaça assustadora na seguinte. O carinho aparece no meio do caos, não fora dele.',
        'Outro ponto forte é a pergunta que acompanha Alma: até que ponto alguém deve ser definido pela própria origem? A história usa o sobrenatural para falar sobre escolhas, pertencimento, confiança e responsabilidade.'
      ],
      callout: 'Tem estética, pancadaria, mistério e uma dupla com química — mas também tem bastante coração escondido no meio de tudo isso.'
    }
  };

  $$('.file-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      const data = gokuFiles[tab.dataset.gokuTab];
      if (!data) return;
      $$('.file-tab').forEach((item) => {
        const active = item === tab;
        item.classList.toggle('active', active);
        item.setAttribute('aria-selected', String(active));
      });
      const panel = $('#goku-panel');
      panel.innerHTML = `
        <p class="file-index"></p>
        <h3></h3>
        <div class="file-paragraphs"></div>
        <div class="file-callout"><span>✦</span><p></p></div>
      `;
      $('.file-index', panel).textContent = data.index;
      $('h3', panel).textContent = data.title;
      data.paragraphs.forEach((paragraph) => {
        const p = document.createElement('p');
        p.textContent = paragraph;
        $('.file-paragraphs', panel).appendChild(p);
      });
      $('.file-callout p', panel).textContent = data.callout;
    });
  });

  // O botão reorganiza a colagem sem recarregar a página.
  $('#shuffle-cards')?.addEventListener('click', () => {
    const board = $('.scrapbook');
    const cards = $$('.memory-card', board);
    for (let i = cards.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    cards.forEach((card) => {
      card.style.transform = `rotate(${(Math.random() * 4 - 2).toFixed(1)}deg)`;
      board.appendChild(card);
    });
    showToast('colagem reorganizada! ✦');
  });

  // Adesivos podem ser clicados para ganhar uma rotação divertida.
  $$('[data-wiggle]').forEach((sticker) => {
    sticker.addEventListener('click', () => {
      const rotation = Math.round(Math.random() * 40 - 20);
      sticker.animate([
        { transform: `rotate(${rotation - 18}deg) scale(.85)` },
        { transform: `rotate(${rotation + 17}deg) scale(1.2)` },
        { transform: `rotate(${rotation}deg) scale(1)` }
      ], { duration: 460, easing: 'cubic-bezier(.2,.8,.2,1)' });
    });
  });

  $('#sparkle-toggle')?.addEventListener('click', (event) => {
    const enabled = document.body.classList.toggle('glitter-mode');
    event.currentTarget.setAttribute('aria-pressed', String(enabled));
    $('.theme-label', event.currentTarget).textContent = enabled ? 'brilho ligado' : 'mais brilho';
    showToast(enabled ? 'modo brilho ativado ✧' : 'modo brilho suave novamente ♡');
  });

  function showToast(message) {
    const toast = $('#toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(showToast.timeoutId);
    showToast.timeoutId = window.setTimeout(() => toast.classList.remove('show'), 1900);
  }

  // Pequenos brilhos acompanham o cursor em computadores; em telas touch, o efeito fica desligado.
  const sparkleLayer = $('#sparkle-layer');
  let lastSparkle = 0;
  window.addEventListener('pointermove', (event) => {
    if (event.pointerType !== 'mouse' || !sparkleLayer) return;
    const now = Date.now();
    if (now - lastSparkle < 85) return;
    lastSparkle = now;
    const sparkle = document.createElement('span');
    sparkle.className = 'cursor-sparkle';
    sparkle.textContent = Math.random() > .5 ? '✧' : '·';
    sparkle.style.left = `${event.clientX}px`;
    sparkle.style.top = `${event.clientY}px`;
    sparkleLayer.appendChild(sparkle);
    window.setTimeout(() => sparkle.remove(), 850);
  }, { passive: true });

  // Barra fina que acompanha a leitura da página.
  const progressBar = $('#progress-bar');
  window.addEventListener('scroll', () => {
    if (!progressBar) return;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    progressBar.style.width = `${Math.min(100, percent)}%`;
  }, { passive: true });
})();
