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

});
