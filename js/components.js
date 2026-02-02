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
            <span class="logo-text">PRISM-PR Review</span>
          </div>
          <div class="nav-links">
            <a href="#features" class="nav-link">${nav.features}</a>
            <a href="#languages" class="nav-link">${nav.languages}</a>
            <a href="#how-it-works" class="nav-link">${nav.howItWorks}</a>
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
            <a href="${GITHUB_MARKETPLACE_URL}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
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
        <div class="carousel-container">
          <div class="carousel-wrapper">
            <div class="languages-carousel" id="languages-carousel"></div>
          </div>
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

  renderDemo() {
    const demo = this.lang.t('demo');
    return `
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">${demo.title}</h2>
          <p class="section-subtitle">${demo.subtitle}</p>
        </div>
        <div class="demo-container">
          <div class="demo-editor">
            <div class="code-window">
              <div class="window-header">
                <div class="window-dots">
                  <span class="dot red"></span>
                  <span class="dot yellow"></span>
                  <span class="dot green"></span>
                </div>
                <div class="window-title">example.js</div>
              </div>
              <div class="window-content">
                <textarea id="demo-code" class="demo-code-input">${SAMPLE_CODE}</textarea>
              </div>
            </div>
            <button id="analyze-btn" class="btn btn-primary demo-analyze-btn">
              ${demo.analyze}
            </button>
          </div>
          <div class="demo-results" id="demo-results">
            <div class="demo-placeholder">
              <span class="demo-icon">◈</span>
              <p>${demo.results}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderFooter() {
    const footer = this.lang.t('footer');
    const currentYear = new Date().getFullYear();
    return `
      <div class="container">
        <div class="footer-simple">
          <p class="footer-copyright">© ${currentYear} ${footer.author}. ${footer.copyright}</p>
          <div class="footer-legal">
            <a href="privacy.html" class="footer-link">${footer.privacy}</a>
            <a href="terms.html" class="footer-link">${footer.terms}</a>
          </div>
        </div>
      </div>
    `;
  }

  renderAll() {
    // Update document title
    const lang = languageManager.getCurrentLang();
    const title = lang === 'en' ? 'PRISM-PR Review - Semantic PR Analyzer' : 'PRISM-PR Review - Analizador Semántico de PR';
    document.title = title;
    document.documentElement.lang = lang;

    document.getElementById('navbar').innerHTML = this.renderNavbar();
    document.getElementById('hero').innerHTML = this.renderHero();
    document.getElementById('features').innerHTML = this.renderFeatures();
    document.getElementById('demo').innerHTML = this.renderDemo();
    document.getElementById('languages').innerHTML = this.renderLanguages();
    document.getElementById('how-it-works').innerHTML = this.renderHowItWorks();
    document.getElementById('footer').innerHTML = this.renderFooter();

    this.attachEventListeners();
    this.attachDemoListeners();
    this.initCarousel();

    // Reinitialize scroll animations for new elements
    if (window.animationController) {
      window.animationController.observeElements();
    }
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
        // updatePage() is called automatically by languageManager, which calls renderAll()
      });
    }

    // Initialize tooltips
    this.updateTooltips();
  }

  updateTooltips() {
    const themeToggle = document.getElementById('theme-toggle');
    const langToggle = document.getElementById('lang-toggle');

    if (themeToggle) {
      themeToggle.title = themeManager.getTooltipText();
      themeToggle.querySelector('.btn-icon').textContent = themeManager.getThemeIcon();
    }

    if (langToggle) {
      langToggle.title = languageManager.getTooltipText();
      langToggle.querySelector('.btn-icon').textContent = languageManager.getLanguageIcon();
    }
  }

  attachDemoListeners() {
    const analyzeBtn = document.getElementById('analyze-btn');
    const demoCode = document.getElementById('demo-code');
    const demoResults = document.getElementById('demo-results');

    if (analyzeBtn && demoCode && demoResults) {
      analyzeBtn.addEventListener('click', () => {
        const demo = this.lang.t('demo');
        analyzeBtn.textContent = demo.analyzing;
        analyzeBtn.disabled = true;

        setTimeout(() => {
          const code = demoCode.value;
          const analysis = this.analyzeCode(code);

          demoResults.innerHTML = `
            <div class="analysis-result">
              <h3>${demo.results}</h3>
              ${analysis}
            </div>
          `;

          analyzeBtn.textContent = demo.analyze;
          analyzeBtn.disabled = false;
        }, 1500);
      });
    }
  }

  analyzeCode(code) {
    const issues = [];

    if (code.includes('var ')) {
      issues.push({ type: 'warning', message: 'Use const or let instead of var', line: code.indexOf('var ') });
    }

    if (code.includes('==')) {
      issues.push({ type: 'warning', message: 'Use === instead of ==', line: code.indexOf('==') });
    }

    const lines = code.split('\n');
    let complexity = 0;
    lines.forEach(line => {
      if (line.includes('for') || line.includes('while') || line.includes('if')) {
        complexity++;
      }
    });

    if (complexity > 3) {
      issues.push({ type: 'info', message: 'High cyclomatic complexity detected', line: 0 });
    }

    if (issues.length === 0) {
      return `
        <div class="analysis-item success">
          <span class="analysis-icon">✓</span>
          <span>No issues found</span>
        </div>
      `;
    }

    return issues.map(issue => `
      <div class="analysis-item ${issue.type}">
        <span class="analysis-icon">${issue.type === 'warning' ? '⚠' : 'ℹ'}</span>
        <span>${issue.message}</span>
      </div>
    `).join('');
  }

  initCarousel() {
    const carousel = document.getElementById('languages-carousel');
    const dotsContainer = document.getElementById('carousel-dots');

    if (!carousel) return;

    carousel.innerHTML = LANGUAGE_LIST.map(lang => `
      <div class="language-badge">${lang}</div>
    `).join('') + LANGUAGE_LIST.map(lang => `
      <div class="language-badge">${lang}</div>
    `).join('');

    const totalItems = LANGUAGE_LIST.length;
    const itemsPerView = window.innerWidth >= 1024 ? 6 : window.innerWidth >= 768 ? 4 : 2;
    let currentIndex = 0;

    const updateCarousel = () => {
      const itemWidth = 100 / itemsPerView;
      const offset = currentIndex * itemWidth;
      carousel.style.transform = `translateX(-${offset}%)`;

      if (currentIndex >= totalItems) {
        setTimeout(() => {
          carousel.style.transition = 'none';
          currentIndex = 0;
          carousel.style.transform = 'translateX(0%)';
          setTimeout(() => {
            carousel.style.transition = 'transform 0.5s ease-in-out';
          }, 50);
        }, 500);
      }
    };

    const autoSlide = () => {
      currentIndex++;
      updateCarousel();
    };

    setInterval(autoSlide, 2000);
    updateCarousel();
  }
}

const components = new Components();
window.components = components;