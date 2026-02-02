document.addEventListener('DOMContentLoaded', () => {
  const currentLang = languageManager.getCurrentLang();
  document.documentElement.lang = currentLang;

  components.renderAll();

  setTimeout(() => {
    animationController.observeElements();
  }, 200);
});
