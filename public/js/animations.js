class AnimationController {
  constructor() {
    this.observers = [];
    this.init();
  }

  init() {
    this.setupScrollAnimations();
    this.setupParallax();
    this.setupSmoothScroll();
  }

  setupScrollAnimations() {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, options);

    this.observers.push(observer);

    setTimeout(() => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(el => observer.observe(el));
    }, 100);
  }

  setupParallax() {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.parallaxEffect();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  parallaxEffect() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-visual');

    parallaxElements.forEach(el => {
      const speed = 0.5;
      el.style.transform = `translateY(${scrolled * speed}px)`;
    });
  }

  setupSmoothScroll() {
    document.addEventListener('click', (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (target) {
        e.preventDefault();
        const id = target.getAttribute('href').slice(1);
        const element = document.getElementById(id);

        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  }

  triggerAnimation(element, animationClass) {
    element.classList.add(animationClass);

    element.addEventListener('animationend', () => {
      element.classList.remove(animationClass);
    }, { once: true });
  }

  observeElements() {
    setTimeout(() => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(el => {
        if (this.observers[0]) {
          this.observers[0].observe(el);
        }
      });
    }, 100);
  }

  reset() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    this.init();
  }
}

const animationController = new AnimationController();