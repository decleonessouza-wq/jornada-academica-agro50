/* Agro 5.0 — Fase 08/R1: boas-vindas acessíveis, somente na primeira visita. */
(() => {
  'use strict';
  const KEY = 'agro50.welcome.v1.seen';
  const params = new URLSearchParams(window.location.search);
  const preview = params.get('boasvindas') === '1';
  let alreadySeen = false;
  try { alreadySeen = window.localStorage.getItem(KEY) === 'yes'; } catch (_) { /* Armazenamento opcional. */ }
  if (alreadySeen && !preview) return;

  const asset = (name) => `assets/${name}`;
  const icons = {
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18M7 14h3"/>',
    cap: '<path d="m2 9 10-5 10 5-10 5-10-5ZM6 11v6c4 3 8 3 12 0v-6M22 9v7"/>',
    document: '<path d="M6 3h9l4 4v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm9 0v5h4M8 12h7M8 16h5"/>',
    group: '<circle cx="9" cy="8" r="3"/><path d="M2.5 20v-2a6.5 6.5 0 0 1 13 0v2M17 5a3 3 0 0 1 0 6M17 14a5 5 0 0 1 4.5 5v1"/>',
    leaf: '<path d="M20 3C10 4 4 10 4 16a5 5 0 0 0 5 5c6 0 12-6 11-18ZM4 21c4-6 7-8 12-11"/>',
    check: '<path d="m4 12 5 5L20 6"/>',
    monitor: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>',
  };
  const icon = (name) => `<svg class="agro-welcome-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]}</svg>`;
  const slides = [
    {
      image: 'welcome-jornada.webp', mobileImage: 'welcome-jornada-cenario-r3.webp', label: 'Boas-vindas', theme: 'green',
      title: 'Bem-vindo à<br>Jornada Acadêmica<br>Agro <em>5.0</em>',
      description: 'Uma experiência criada para aproximar você da tecnologia, da inovação e das oportunidades no agro.',
      features: [['calendar', 'Evento gratuito'], ['cap', 'Palestras, minicursos e experiências']],
      next: 'Próximo'
    },
    {
      image: 'welcome-jornada-campo-r3.webp', mobileImage: 'welcome-jornada-campo-r3.webp', label: 'Descubra a Jornada', theme: 'green',
      title: 'Aprenda,<br>conecte-se<br>e <em>participe</em>',
      description: 'A Jornada reúne atividades pensadas para quem quer ampliar conhecimentos, trocar experiências e viver uma programação atual e inspiradora.',
      features: [['document', 'Inscrição gratuita'], ['cap', 'Palestras e minicursos'], ['check', 'Certificados de participação'], ['group', 'Atividades presenciais e online']],
      note: 'Escolha as atividades e monte sua participação do seu jeito.',
      next: 'Próximo'
    },
    {
      image: 'welcome-blueplant.webp', mobileImage: 'welcome-blueplant-cenario-r3.webp', label: 'Treinamento Altus BluePlant', theme: 'blue',
      title: 'Explore também o<br>Treinamento<br><em>Altus BluePlant</em>',
      description: 'Uma oportunidade para conhecer, na prática, como sistemas supervisórios e tecnologias conectadas ajudam a acompanhar processos e informações no campo e na agroindústria.',
      features: [['calendar', 'Inscrição exclusiva'], ['cap', 'Vivência prática'], ['leaf', 'Tecnologia aplicada ao campo']],
      note: 'Agora você pode seguir para a Jornada ou conhecer o treinamento.',
      next: 'Conhecer o treinamento'
    }
  ];

  const boot = () => {
    if (!document.body) return;
    const oldFocus = document.activeElement;
    const background = Array.from(document.querySelectorAll('body > header, body > main, body > footer'));
    const priorInert = background.map(el => el.inert);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let automatic = !reducedMotion;
    let step = 0;
    let timer = null;
    let closed = false;
    const savedOverflow = document.body.style.overflow;
    const overlay = document.createElement('div');
    overlay.className = 'agro-welcome-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'agro-welcome-heading');
    overlay.setAttribute('aria-describedby', 'agro-welcome-description');

    function remember() {
      try { window.localStorage.setItem(KEY, 'yes'); } catch (_) { /* A navegação continua disponível. */ }
    }
    function close() {
      if (closed) return;
      closed = true;
      window.clearTimeout(timer);
      remember();
      document.body.classList.remove('agro-welcome-active');
      document.body.style.overflow = savedOverflow;
      background.forEach((el, i) => { el.inert = priorInert[i]; });
      overlay.remove();
      if (oldFocus && typeof oldFocus.focus === 'function') oldFocus.focus({ preventScroll: true });
    }
    function pause() { automatic = false; window.clearTimeout(timer); }
    function render(focusNext = false) {
      if (closed) return;
      window.clearTimeout(timer);
      const slide = slides[step];
      overlay.setAttribute('data-theme', slide.theme);
      overlay.innerHTML = `
        <div class="agro-welcome-dialog" data-step="${step + 1}" style="--agro-photo: url('${asset(slide.image)}'); --agro-mobile-photo: url('${asset(slide.mobileImage || slide.image)}')">
          <picture class="agro-welcome-picture">
            ${slide.mobileImage ? `<source media="(max-width: 680px)" srcset="${asset(slide.mobileImage)}"/>` : ''}
            <img class="agro-welcome-photo" src="${asset(slide.image)}" alt="" aria-hidden="true" fetchpriority="high"/>
          </picture>
          <div class="agro-welcome-header">
            <div class="agro-welcome-brand" aria-label="UniSENAI MT e Altus BluePlant">
              <img src="assets/brand/web/unisenai-mt-branco.png" alt="UniSENAI MT"/>
              <span class="agro-welcome-brand-divider" aria-hidden="true"></span>
              <img src="assets/brand/web/altus-branco.png" alt="Altus"/>
              <span class="agro-welcome-blue-label">Treinamento<br><strong>BluePlant</strong></span>
            </div>
            <span class="agro-welcome-jornada-badge" aria-label="Jornada Acadêmica Agro 5.0">
              <img src="assets/welcome-jornada-logo-oficial.webp" alt="Jornada Acadêmica Agro 5.0 — Computação sem Fronteiras na Engenharia do Campo"/>
            </span>
            <div class="agro-welcome-state">
              <span>${step + 1} de 3</span>
              <div class="agro-welcome-dots" aria-label="Tela ${step + 1} de 3">
                ${slides.map((_, i) => `<button type="button" class="agro-welcome-dot ${i === step ? 'is-current' : ''}" data-goto="${i}" aria-label="Ir para a tela ${i + 1}" ${i === step ? 'aria-current="step"' : ''}></button>`).join('')}
              </div>
            </div>
          </div>
          <div class="agro-welcome-content" aria-live="polite">
            <div class="agro-welcome-rule" aria-hidden="true"></div>
            <p class="agro-welcome-eyebrow">${slide.label}</p>
            <h2 id="agro-welcome-heading">${slide.title}</h2>
            <p class="agro-welcome-description" id="agro-welcome-description">${slide.description}</p>
            <div class="agro-welcome-benefits">${slide.features.map(([ic, name]) => `<div class="agro-welcome-benefit"><span class="agro-welcome-benefit-icon">${icon(ic)}</span><span>${name}</span></div>`).join('')}</div>
            ${slide.note ? `<p class="agro-welcome-note">${icon('leaf')}<span>${slide.note}</span></p>` : ''}
            <div class="agro-welcome-actions">
              <button type="button" class="agro-welcome-primary" data-action="next">${slide.next} <span aria-hidden="true">→</span></button>
              <button type="button" class="agro-welcome-secondary" data-action="${step === 0 ? 'skip' : step === 2 ? 'enter' : 'back'}">${step === 0 ? 'Pular' : step === 2 ? 'Entrar no site' : 'Voltar'} <span aria-hidden="true">${step === 1 ? '←' : '→'}</span></button>
            </div>

          </div>
        </div>`;
      if (focusNext) overlay.querySelector('[data-action="next"]').focus({ preventScroll: true });
      overlay.querySelector('.agro-welcome-dialog').scrollTop = 0;
      if (automatic && step < 2) timer = window.setTimeout(() => {
        if (!closed) { step += 1; render(false); }
      }, 13000);
    }
    overlay.addEventListener('click', event => {
      const go = event.target.closest('[data-goto]');
      if (go) { pause(); step = Number(go.getAttribute('data-goto')); render(true); return; }
      const button = event.target.closest('[data-action]');
      if (!button) return;
      const action = button.getAttribute('data-action');
      if (action === 'skip' || action === 'enter') { close(); return; }
      if (action === 'back') { pause(); step = Math.max(0, step - 1); render(true); return; }
      if (action === 'next') {
        pause();
        if (step === 2) { close(); window.location.assign('altus.html'); return; }
        step += 1; render(true);
      }
    });
    overlay.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') { event.preventDefault(); close(); return; }
      if (event.key === 'ArrowRight' && step < 2) { event.preventDefault(); pause(); step += 1; render(true); }
      if (event.key === 'ArrowLeft' && step > 0) { event.preventDefault(); pause(); step -= 1; render(true); }
      if (event.key !== 'Tab') return;
      const focusable = Array.from(overlay.querySelectorAll('button:not([disabled])'));
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
    document.body.appendChild(overlay);
    background.forEach(el => { el.inert = true; });
    document.body.classList.add('agro-welcome-active');
    document.body.style.overflow = 'hidden';
    render();
    const skip = overlay.querySelector('[data-action="skip"]');
    if (skip) skip.focus({ preventScroll: true });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
})();
