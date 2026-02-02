class ThemeManager {
  constructor() {
    this.currentTheme = localStorage.getItem('theme') || 'light';
    this.init();
  }

  init() {
    document.documentElement.setAttribute('data-theme', this.currentTheme);
  }

  toggle() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', this.currentTheme);
    document.documentElement.setAttribute('data-theme', this.currentTheme);

    const body = document.body;
    body.classList.add('theme-transition');

    setTimeout(() => {
      body.classList.remove('theme-transition');
    }, 300);
  }

  getThemeIcon() {
    return this.currentTheme === 'light' ? '☀' : '☾';
  }

  getThemeName() {
    return this.currentTheme === 'light' ? 'Light' : 'Dark';
  }

  getTooltipText() {
    return this.currentTheme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode';
  }

  getCurrentTheme() {
    return this.currentTheme;
  }
}

const themeManager = new ThemeManager();