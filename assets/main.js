document.addEventListener('DOMContentLoaded', () => {
'use strict';
const menuButton = document.querySelector('[data-menu-toggle]');
const navigation = document.querySelector('[data-navigation]');
if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.textContent = isOpen ? 'Fechar ✕' : 'Menu ☰';
  });
  navigation.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = 'Menu ☰';
  }));
}
const filterButtons = [...document.querySelectorAll('[data-filter]')];
const sessions = [...document.querySelectorAll('[data-month]')];
const count = document.querySelector('[data-count]');
function filterSessions(month) {
  let shown = 0;
  sessions.forEach(session => {
    const visible = month === 'todos' || session.dataset.month === month;
    session.classList.toggle('hidden', !visible);
    if (visible) shown++;
  });
  if (count) count.textContent = `${shown} ${shown === 1 ? 'atividade' : 'atividades'} na seleção`;
  filterButtons.forEach(btn => btn.setAttribute('aria-pressed', String(btn.dataset.filter === month)));
}
filterButtons.forEach(btn => btn.addEventListener('click', () => filterSessions(btn.dataset.filter)));
if (filterButtons.length) filterSessions('todos');

// Feedback sutil do cabeçalho ao rolar a página.
const header = document.querySelector('.topbar');
if (header) {
  const reflectScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
  reflectScroll();
  window.addEventListener('scroll', reflectScroll, { passive: true });
}

// Fechar o menu com Escape e manter o foco no botão de abertura.
if (menuButton && navigation) {
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navigation.classList.contains('open')) {
      navigation.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.textContent = 'Menu ☰';
      menuButton.focus();
    }
  });
}

// Revelação progressiva opcional; conteúdo continua visível sem JS ou com movimento reduzido.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reducedMotion && 'IntersectionObserver' in window) {
  const revealTargets = document.querySelectorAll(
    '.agenda-item, .campus-grid, .features .feature, .sec-head, .highlight-grid .card, .topic, .step'
  );
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.remove('reveal-pending');
      entry.target.classList.add('reveal-visible');
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.09, rootMargin: '0px 0px -24px 0px' });
  revealTargets.forEach(el => {
    // Elementos já visíveis não devem piscar na entrada.
    if (el.getBoundingClientRect().top > window.innerHeight * 0.9) {
      el.classList.add('reveal-pending');
      observer.observe(el);
    }
  });
  document.documentElement.classList.add('motion-ready');
}

});
