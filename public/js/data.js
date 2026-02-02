const TRANSLATIONS = {
  en: {
    nav: {
      features: 'Features',
      languages: 'Languages',
      howItWorks: 'How it Works',
      pricing: 'Pricing'
    },
    hero: {
      badge: 'Supporting 12+ Languages',
      title: 'Semantic Analysis for',
      titleHighlight: 'Pull Requests',
      description: 'Automated code quality analysis, security scanning, and performance insights for your GitHub Pull Requests. Make informed decisions with AI-powered code review.',
      ctaPrimary: 'Get Started Free',
      ctaSecondary: 'Watch Demo',
      stats: {
        languages: 'Languages',
        analysisTypes: 'Analysis Types',
        prsAnalyzed: 'PRs Analyzed'
      }
    },
    features: {
      title: 'Powerful Analysis Features',
      subtitle: 'Comprehensive code analysis powered by advanced semantic parsing',
      items: [
        {
          title: 'Security Analysis',
          description: 'Detect vulnerabilities, hardcoded secrets, SQL injection, XSS, and more',
          list: ['Secret detection', 'Vulnerability scanning', 'Security best practices']
        },
        {
          title: 'Performance Insights',
          description: 'Identify performance bottlenecks, memory leaks, and inefficient algorithms',
          list: ['Complexity analysis', 'Memory leak detection', 'Algorithm optimization']
        },
        {
          title: 'Code Quality',
          description: 'Semantic analysis for maintainability, readability, and best practices',
          list: ['Code smell detection', 'Naming conventions', 'Unused code removal']
        },
        {
          title: 'Code Metrics',
          description: 'Detailed metrics including complexity, maintainability, and technical debt',
          list: ['Cyclomatic complexity', 'Maintainability index', 'Technical debt']
        }
      ]
    },
    languages: {
      title: 'Multi-Language Support',
      subtitle: 'Native support for 12+ programming languages'
    },
    howItWorks: {
      title: 'How It Works',
      subtitle: 'Simple setup, powerful results',
      steps: [
        {
          title: 'Install GitHub App',
          description: 'Install PRISM on your GitHub repositories with one click'
        },
        {
          title: 'Open Pull Request',
          description: 'Create or update any pull request as usual'
        },
        {
          title: 'Get Instant Analysis',
          description: 'Receive detailed analysis report automatically'
        }
      ]
    },
    pricing: {
      title: 'Simple Pricing',
      subtitle: 'Choose the plan that works for you',
      plans: [
        {
          name: 'Free',
          price: '$0',
          period: '/month',
          badge: null,
          features: [
            'Up to 100 PRs/month',
            'All languages supported',
            'Basic analysis',
            'Priority support',
            'Custom rules'
          ],
          cta: 'Get Started'
        },
        {
          name: 'Pro',
          price: '$29',
          period: '/month',
          badge: 'Most Popular',
          features: [
            'Unlimited PRs',
            'All languages supported',
            'Advanced analysis',
            'Priority support',
            'Custom rules'
          ],
          cta: 'Get Started'
        },
        {
          name: 'Enterprise',
          price: 'Custom',
          period: '',
          badge: null,
          features: [
            'Unlimited everything',
            'Dedicated support',
            'On-premise option',
            'Custom integrations',
            'SLA guarantees'
          ],
          cta: 'Contact Sales'
        }
      ]
    },
    footer: {
      description: 'Semantic Pull Request Analysis for Modern Development',
      columns: [
        {
          title: 'Product',
          links: ['Features', 'Languages', 'Pricing']
        },
        {
          title: 'Resources',
          links: ['Documentation', 'API', 'Support']
        },
        {
          title: 'Company',
          links: ['About', 'Blog', 'Contact']
        }
      ],
      legal: ['Privacy', 'Terms'],
      copyright: 'All rights reserved.'
    }
  },
  es: {
    nav: {
      features: 'Características',
      languages: 'Lenguajes',
      howItWorks: 'Cómo Funciona',
      pricing: 'Precios'
    },
    hero: {
      badge: 'Soporta más de 12 lenguajes',
      title: 'Análisis Semántico para',
      titleHighlight: 'Pull Requests',
      description: 'Análisis automatizado de calidad de código, escaneo de seguridad y perspectivas de rendimiento para tus Pull Requests de GitHub. Toma decisiones informadas con revisión de código potenciada por IA.',
      ctaPrimary: 'Comenzar Gratis',
      ctaSecondary: 'Ver Demo',
      stats: {
        languages: 'Lenguajes',
        analysisTypes: 'Tipos de Análisis',
        prsAnalyzed: 'PRs Analizados'
      }
    },
    features: {
      title: 'Características Poderosas de Análisis',
      subtitle: 'Análisis integral de código impulsado por parsing semántico avanzado',
      items: [
        {
          title: 'Análisis de Seguridad',
          description: 'Detecta vulnerabilidades, secretos hardcodeados, inyección SQL, XSS, y más',
          list: ['Detección de secretos', 'Escaneo de vulnerabilidades', 'Mejores prácticas de seguridad']
        },
        {
          title: 'Perspectivas de Rendimiento',
          description: 'Identifica cuellos de botella, fugas de memoria y algoritmos ineficientes',
          list: ['Análisis de complejidad', 'Detección de fugas de memoria', 'Optimización de algoritmos']
        },
        {
          title: 'Calidad de Código',
          description: 'Análisis semántico para mantenibilidad, legibilidad y mejores prácticas',
          list: ['Detección de code smells', 'Convenciones de nombres', 'Eliminación de código no usado']
        },
        {
          title: 'Métricas de Código',
          description: 'Métricas detalladas incluyendo complejidad, mantenibilidad y deuda técnica',
          list: ['Complejidad ciclomática', 'Índice de mantenibilidad', 'Deuda técnica']
        }
      ]
    },
    languages: {
      title: 'Soporte Multi-Lenguaje',
      subtitle: 'Soporte nativo para más de 12 lenguajes de programación'
    },
    howItWorks: {
      title: 'Cómo Funciona',
      subtitle: 'Configuración simple, resultados poderosos',
      steps: [
        {
          title: 'Instalar GitHub App',
          description: 'Instala PRISM en tus repositorios de GitHub con un click'
        },
        {
          title: 'Abrir Pull Request',
          description: 'Crea o actualiza cualquier pull request como siempre'
        },
        {
          title: 'Obtener Análisis Instantáneo',
          description: 'Recibe un reporte de análisis detallado automáticamente'
        }
      ]
    },
    pricing: {
      title: 'Precios Simples',
      subtitle: 'Elige el plan que funciona para ti',
      plans: [
        {
          name: 'Gratis',
          price: '$0',
          period: '/mes',
          badge: null,
          features: [
            'Hasta 100 PRs/mes',
            'Todos los lenguajes soportados',
            'Análisis básico',
            'Soporte prioritario',
            'Reglas personalizadas'
          ],
          cta: 'Comenzar'
        },
        {
          name: 'Pro',
          price: '$29',
          period: '/mes',
          badge: 'Más Popular',
          features: [
            'PRs ilimitados',
            'Todos los lenguajes soportados',
            'Análisis avanzado',
            'Soporte prioritario',
            'Reglas personalizadas'
          ],
          cta: 'Comenzar'
        },
        {
          name: 'Empresarial',
          price: 'Personalizado',
          period: '',
          badge: null,
          features: [
            'Todo ilimitado',
            'Soporte dedicado',
            'Opción on-premise',
            'Integraciones personalizadas',
            'Garantías SLA'
          ],
          cta: 'Contactar Ventas'
        }
      ]
    },
    footer: {
      description: 'Análisis Semántico de Pull Requests para Desarrollo Moderno',
      columns: [
        {
          title: 'Producto',
          links: ['Características', 'Lenguajes', 'Precios']
        },
        {
          title: 'Recursos',
          links: ['Documentación', 'API', 'Soporte']
        },
        {
          title: 'Compañía',
          links: ['Acerca de', 'Blog', 'Contacto']
        }
      ],
      legal: ['Privacidad', 'Términos'],
      copyright: 'Todos los derechos reservados.'
    }
  }
};

const LANGUAGE_LIST = ['TypeScript', 'JavaScript', 'Java', 'Go', 'C#', 'Rust', 'Dart', 'Python', 'Ruby', 'PHP', 'Swift', 'Kotlin'];

const FEATURE_ICONS = ['◬', '◉', '◈', '◐'];

const STATS = {
  languages: '12+',
  analysisTypes: '4',
  prsAnalyzed: '∞'
};

const PRICING_FEATURES_INCLUDED = [
  [true, true, true, false, false],
  [true, true, true, true, true],
  [true, true, true, true, true]
];