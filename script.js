const app = document.querySelector('#app');
const navButtons = document.querySelectorAll('.nav-button[data-page]');
const validPages = ['accueil', 'fonctionnalites', 'comparaison', 'configuration', 'prix', 'licence', 'telechargement', 'apropos'];

function setActiveButton(pageName) {
  navButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.page === pageName);
  });
}

function renderPage(pageName) {
  const safePageName = validPages.includes(pageName) ? pageName : 'accueil';
  const template = document.querySelector(`#page-${safePageName}`);

  if (!template) return;

  app.replaceChildren(template.content.cloneNode(true));
  setActiveButton(safePageName);
  window.history.replaceState(null, '', `#${safePageName}`);

  const title = app.querySelector('h1');
  if (title) {
    title.setAttribute('tabindex', '-1');
    title.focus({ preventScroll: true });
  }
}

function handleNavigation(event) {
  const button = event.target.closest('.nav-button[data-page]');
  if (!button) return;
  event.preventDefault();
  renderPage(button.dataset.page);
}

document.addEventListener('click', handleNavigation);

window.addEventListener('popstate', () => {
  const pageName = window.location.hash.replace('#', '') || 'accueil';
  renderPage(pageName);
});

renderPage(window.location.hash.replace('#', '') || 'accueil');
