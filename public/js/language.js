class LanguageManager {
  constructor() {
    this.currentLang = localStorage.getItem('language') || 'en';
    this.translations = TRANSLATIONS;
  }

  getCurrentLang() {
    return this.currentLang;
  }

  setLanguage(lang) {
    this.currentLang = lang;
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    this.updatePage();
  }

  toggle() {
    const newLang = this.currentLang === 'en' ? 'es' : 'en';
    this.setLanguage(newLang);
  }

  t(path) {
    const keys = path.split('.');
    let value = this.translations[this.currentLang];

    for (const key of keys) {
      value = value[key];
      if (value === undefined) return path;
    }

    return value;
  }

  updatePage() {
    if (window.components) {
      window.components.renderAll();
    }
  }

  getLanguageIcon() {
    return this.currentLang === 'en' ? '🇺🇸' : '🇪🇸';
  }

  getLanguageName() {
    return this.currentLang === 'en' ? 'English' : 'Español';
  }

  getTooltipText() {
    return this.currentLang === 'en' ? 'Switch to Español' : 'Cambiar a English';
  }
}

const languageManager = new LanguageManager();