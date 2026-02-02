class Components {
  constructor() {
    this.lang = languageManager;
  }

  renderNavbar() {
    const nav = this.lang.t('nav');
    return `
      <div class="container">
        <div class="nav-content">
          <div class="logo">
            <span class="logo-icon">◈</span>
            <span class="logo-text">PRISM</span>
          </div>
          <div class="nav-links">
            <a href="#features" class="nav-link">${nav.features}</a>
            <a href="#languages" class="nav-link">${nav.languages}</a>
            <a href="#how-it-works" class="nav-link">${nav.howItWorks}</a>
            <a href="#pricing" class="nav-link">${nav.pricing}</a>
            <button id="lang-toggle" class="icon-btn" title="${this.lang.getTooltipText()}">
              <span class="btn-icon">${this.lang.getLanguageIcon()}</span>
            </button>
            <button id="theme-toggle" class="icon-btn" title="${themeManager.getTooltipText()}">
              <span class="btn-icon">${themeManager.getThemeIcon()}</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  renderHero() {
    const hero = this.lang.t('hero');
    return `
      <div class="container">
        <div class="hero-content">
          <div class="hero-badge animate-fade-in">
            <span class="badge-text">${hero.badge}</span>
          </div>
          <h1 class="hero-title animate-fade-in-up">
            ${hero.title}
            <span class="gradient-text">${hero.titleHighlight}</span>
          </h1>
          <p class="hero-description animate-fade-in-up">
            ${hero.description}
          </p>
          <div class="hero-actions animate-fade-in-up">
            <a href="#get-started" class="btn btn-primary">
              ${hero.ctaPrimary}
              <span class="btn-arrow">→</span>
            </a>
            <a href="#demo" class="btn btn-secondary">
              ${hero.ctaSecondary}
              <span class="btn-arrow">▶</span>
            </a>
          </div>
          <div class="hero-stats animate-fade-in-up">
            <div class="stat">
              <div class="stat-number">${STATS.languages}</div>
              <div class="stat-label">${hero.stats.languages}</div>
            </div>
            <div class="stat">
              <div class="stat-number">${STATS.analysisTypes}</div>
              <div class="stat-label">${hero.stats.analysisTypes}</div>
            </div>
            <div class="stat">
              <div class="stat-number">${STATS.prsAnalyzed}</div>
              <div class="stat-label">${hero.stats.prsAnalyzed}</div>
            </div>
          </div>
        </div>
        <div class="hero-visual animate-slide-in">
          ${this.renderCodeWindow()}
        </div>
      </div>
    `;
  }

  renderCodeWindow() {
    return `
      <div class="code-window">
        <div class="window-header">
          <div class="window-dots">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
          </div>
          <div class="window-title">analysis-report.md</div>
        </div>
        <div class="window-content">
          <div class="code-line"><span class="line-number">1</span><span class="code-text"># PRISM Analysis Report</span></div>
          <div class="code-line"><span class="line-number">2</span><span class="code-text"></span></div>
          <div class="code-line"><span class="line-number">3</span><span class="code-text"><span class="code-keyword">**Pull Request:**</span> #123</span></div>
          <div class="code-line"><span class="line-number">4</span><span class="code-text"><span class="code-keyword">**Risk Score:**</span> <span class="code-success">15/100</span></span></div>
          <div class="code-line"><span class="line-number">5</span><span class="code-text"></span></div>
          <div class="code-line"><span class="line-number">6</span><span class="code-text">## Issues Found</span></div>
          <div class="code-line"><span class="line-number">7</span><span class="code-text"><span class="code-success">✓</span> No critical issues</span></div>
        </div>
      </div>
    `;
  }

  renderFeatures() {
    const features = this.lang.t('features');
    return `
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">${features.title}</h2>
          <p class="section-subtitle">${features.subtitle}</p>
        </div>
        <div class="features-grid">
          ${features.items.map((feature, index) => `
            <div class="feature-card animate-on-scroll">
              <div class="feature-icon">${FEATURE_ICONS[index]}</div>
              <h3 class="feature-title">${feature.title}</h3>
              <p class="feature-description">${feature.description}</p>
              <ul class="feature-list">
                ${feature.list.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  renderLanguages() {
    const languages = this.lang.t('languages');
    return `
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">${languages.title}</h2>
          <p class="section-subtitle">${languages.subtitle}</p>
        </div>
        <div class="languages-grid">
          ${LANGUAGE_LIST.map(lang => `
            <div class="language-badge animate-on-scroll">${lang}</div>
          `).join('')}
        </div>
      </div>
    `;
  }

  renderHowItWorks() {
    const howItWorks = this.lang.t('howItWorks');
    return `
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">${howItWorks.title}</h2>
          <p class="section-subtitle">${howItWorks.subtitle}</p>
        </div>
        <div class="steps">
          ${howItWorks.steps.map((step, index) => `
            <div class="step animate-on-scroll">
              <div class="step-number">${index + 1}</div>
              <h3 class="step-title">${step.title}</h3>
              <p class="step-description">${step.description}</p>
            </div>
            ${index < howItWorks.steps.length - 1 ? '<div class="step-connector"></div>' : ''}
          `).join('')}
        </div>
      </div>
    `;
  }

  renderPricing() {
    const pricing = this.lang.t('pricing');
    return `
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">${pricing.title}</h2>
          <p class="section-subtitle">${pricing.subtitle}</p>
        </div>
        <div class="pricing-grid">
          ${pricing.plans.map((plan, index) => `
            <div class="pricing-card ${plan.badge ? 'featured' : ''} animate-on-scroll">
              ${plan.badge ? `<div class="pricing-badge">${plan.badge}</div>` : ''}
              <h3 class="pricing-title">${plan.name}</h3>
              <div class="pricing-price">
                <span class="price-amount">${plan.price}</span>
                <span class="price-period">${plan.period}</span>
              </div>
              <ul class="pricing-features">
                ${plan.features.map((feature, fi) => `
                  <li class="feature-item ${PRICING_FEATURES_INCLUDED[index][fi] ? 'included' : 'excluded'}">
                    <span class="feature-icon">${PRICING_FEATURES_INCLUDED[index][fi] ? '✓' : '×'}</span>
                    ${feature}
                  </li>
                `).join('')}
              </ul>
              <a href="#get-started" class="btn ${plan.badge ? 'btn-primary' : 'btn-outline'}">${plan.cta}</a>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  renderFooter() {
    const footer = this.lang.t('footer');
    const currentYear = new Date().getFullYear();
    return `
      <div class="container">
        <div class="footer-content">
          <div class="footer-brand">
            <div class="logo">
              <span class="logo-icon">◈</span>
              <span class="logo-text">PRISM</span>
            </div>
            <p class="footer-description">${footer.description}</p>
          </div>
          <div class="footer-links">
            ${footer.columns.map(column => `
              <div class="footer-column">
                <h4 class="footer-title">${column.title}</h4>
                ${column.links.map(link => `
                  <a href="#" class="footer-link">${link}</a>
                `).join('')}
              </div>
            `).join('')}
          </div>
        </div>
        <div class="footer-bottom">
          <p class="footer-copyright">© ${currentYear} PRISM. ${footer.copyright}</p>
          <div class="footer-legal">
            ${footer.legal.map(item => `
              <a href="#" class="footer-link">${item}</a>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  renderAll() {
    document.getElementById('navbar').innerHTML = this.renderNavbar();
    document.getElementById('hero').innerHTML = this.renderHero();
    document.getElementById('features').innerHTML = this.renderFeatures();
    document.getElementById('languages').innerHTML = this.renderLanguages();
    document.getElementById('how-it-works').innerHTML = this.renderHowItWorks();
    document.getElementById('pricing').innerHTML = this.renderPricing();
    document.getElementById('footer').innerHTML = this.renderFooter();

    this.attachEventListeners();
  }

  attachEventListeners() {
    const themeToggle = document.getElementById('theme-toggle');
    const langToggle = document.getElementById('lang-toggle');

    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        themeManager.toggle();
        this.updateTooltips();
      });
    }

    if (langToggle) {
      langToggle.addEventListener('click', () => {
        languageManager.toggle();
      });
    }
  }

  updateTooltips() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.title = themeManager.getTooltipText();
      themeToggle.querySelector('.btn-icon').textContent = themeManager.getThemeIcon();
    }
  }
}

const components = new Components();
window.components = components;