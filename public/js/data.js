const GITHUB_MARKETPLACE_URL = 'https://github.com/apps/prism-pr-review';

const SAMPLE_CODE = `function calculateTotal(items) {
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    total = total + items[i].price;
  }
  return total;
}`;

const TRANSLATIONS = {
  en: {
    nav: {
      features: 'Features',
      languages: 'Languages',
      howItWorks: 'How it Works'
    },
    hero: {
      badge: 'Supporting 12+ Languages',
      title: 'Semantic Analysis for',
      titleHighlight: 'Pull Requests',
      description: 'Semantic analysis that explains what changes in a Pull Request and where the risk is.',
      ctaPrimary: 'Add to GitHub',
      ctaSecondary: 'View Live Demo',
      stats: {
        languages: 'Languages',
        analysisTypes: 'Analysis Types',
        prsAnalyzed: 'Real-time PR Analysis',
        prsAnalyzedValue: 'Real-time'
      }
    },
    demo: {
      title: 'Try It Live',
      subtitle: 'See PRISM-PR Review in action with a real code analysis',
      analyze: 'Analyze Code',
      analyzing: 'Analyzing...',
      results: 'Analysis Results'
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
          title: 'Activate on GitHub',
          description: 'Activate PRISM on your GitHub repositories with one click'
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
    footer: {
      author: 'Jhafet Cañepa',
      copyright: 'All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service'
    },
    privacyPage: {
      title: 'Privacy Policy',
      lastUpdated: 'Last updated: January 2026',
      backButton: '← Back to Home',
      sections: [
        {
          title: '1. Information We Collect',
          content: `PRISM-PR Review collects the following information when you install and use our GitHub App:


• Analysis Results: Generated reports and identified code issues
• Usage Analytics: Number of PRs analyzed, features used, and performance metrics`
        },
        {
          title: '2. How We Use Your Information',
          content: `We use the collected information for the following purposes:

• Performing code quality analysis on your pull requests
• Detecting security vulnerabilities and performance issues
• Generating analysis reports and recommendations
• Improving our analysis algorithms and detection capabilities
• Providing customer support and technical assistance
• Monitoring service performance and reliability`
        },
        {
          title: '3. Data Storage and Security',
          content: `We take data security seriously and implement industry-standard measures:

• Encryption: All data is encrypted in transit using TLS 1.3
• Data Retention: Analysis results are retained for 90 days, then automatically deleted
• Code Storage: We do not permanently store your source code
• Infrastructure: Hosted on secure cloud infrastructure with regular security audits`
        },
        {
          title: '4. Data Sharing',
          content: `We do not sell, rent, or share your personal information or code with third parties except:

• With your explicit consent
• To comply with legal obligations or valid legal requests
• To protect against fraud or security threats
• With service providers who assist in operating our service (under strict confidentiality agreements)`
        },
        {
          title: '5. Your Rights',
          content: `You have the following rights regarding your data:

• Access: Request a copy of the data we have about you
• Correction: Request correction of inaccurate data
• Deletion: Request deletion of your data
• Export: Export your analysis results in machine-readable format
• Opt-out: Uninstall the app at any time to stop data collection`
        },
        {
          title: '6. Contact Us',
          content: `If you have questions about this Privacy Policy or our data practices, please contact us:

[EMAIL]jafetcanepa@outlook.es[/EMAIL]
[WEBSITE]coderesolutions.com[/WEBSITE]
[GITHUB]jafcn09[/GITHUB]`
        }
      ]
    },
    termsPage: {
      title: 'Terms of Service',
      lastUpdated: 'Last updated: January 2026',
      backButton: '← Back to Home',
      sections: [
        {
          title: '1. Acceptance of Terms',
          content: 'By installing and using PRISM-PR Review, you agree to be bound by these Terms of Service. If you do not agree to these terms, do not install or use the service.'
        },
        {
          title: '2. Description of Service',
          content: `PRISM-PR Review is a GitHub App that provides automated code analysis for pull requests, including:

• Security vulnerability detection
• Performance optimization recommendations
• Code quality metrics and analysis
• Code complexity assessments
• Best practices enforcement`
        },
        {
          title: '3. User Responsibilities',
          content: `You agree to:

• Provide accurate information during installation
• Maintain the security of your GitHub account
• Use the service only for lawful purposes
• Not attempt to reverse engineer, decompile, or hack the service
• Not use the service to analyze malicious code or malware
• Comply with all applicable laws and regulations`
        },
        {
          title: '4. Service Availability',
          content: `We strive to provide reliable service but do not guarantee 100% uptime or uninterrupted access. We reserve the right to modify, suspend, or discontinue the service at any time with reasonable notice.`
        },
        {
          title: '5. Limitation of Liability',
          content: `To the maximum extent permitted by law:

• We are not liable for indirect, incidental, or consequential damages
• Our total liability is limited to the amount you paid in the last 12 months
• We are not responsible for data loss, security breaches, or service interruptions`
        },
        {
          title: '6. Contact Information',
          content: `For questions about these Terms of Service:

[EMAIL]jafetcanepa@outlook.es[/EMAIL]
[WEBSITE]coderesolutions.com[/WEBSITE]
[GITHUB]jafcn09[/GITHUB]`
        }
      ]
    }
  },
  es: {
    nav: {
      features: 'Características',
      languages: 'Lenguajes',
      howItWorks: 'Cómo Funciona'
    },
    hero: {
      badge: 'Soporta más de 12 lenguajes',
      title: 'Análisis Semántico para',
      titleHighlight: 'Pull Requests',
      description: 'Análisis semántico que explica qué cambia en un Pull Request y dónde está el riesgo.',
      ctaPrimary: 'Agregar a GitHub',
      ctaSecondary: 'Ver Demo en Vivo',
      stats: {
        languages: 'Lenguajes',
        analysisTypes: 'Tipos de Análisis',
        prsAnalyzed: 'Análisis de PR en Tiempo Real',
        prsAnalyzedValue: 'Tiempo Real'
      }
    },
    demo: {
      title: 'Pruébalo en Vivo',
      subtitle: 'Mira PRISM-PR Review en acción con un análisis de código real',
      analyze: 'Analizar Código',
      analyzing: 'Analizando...',
      results: 'Resultados del Análisis'
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
          title: 'Activar en GitHub',
          description: 'Activa PRISM en tus repositorios de GitHub con un click'
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
    footer: {
      author: 'Jhafet Cañepa',
      copyright: 'Todos los derechos reservados.',
      privacy: 'Política de Privacidad',
      terms: 'Términos de Servicio'
    },
    privacyPage: {
      title: 'Política de Privacidad',
      lastUpdated: 'Última actualización: Enero 2026',
      backButton: '← Volver al Inicio',
      sections: [
        {
          title: '1. Información que Recopilamos',
          content: `PRISM-PR Review recopila la siguiente información cuando instalas y usas nuestra GitHub App:


• Resultados de Análisis: Reportes generados e issues de código identificados
• Analíticas de Uso: Número de PRs analizados, funciones usadas y métricas de rendimiento`
        },
        {
          title: '2. Cómo Usamos tu Información',
          content: `Usamos la información recopilada para los siguientes propósitos:

• Realizar análisis de calidad de código en tus pull requests
• Detectar vulnerabilidades de seguridad y problemas de rendimiento
• Generar reportes de análisis y recomendaciones
• Mejorar nuestros algoritmos de análisis y capacidades de detección
• Proporcionar soporte al cliente y asistencia técnica
• Monitorear el rendimiento y confiabilidad del servicio`
        },
        {
          title: '3. Almacenamiento y Seguridad de Datos',
          content: `Tomamos la seguridad de datos seriamente e implementamos medidas estándar de la industria:

• Encriptación: Todos los datos están encriptados en tránsito usando TLS 1.3
• Control de Acceso: Controles de acceso estrictos limitan quién puede ver tus datos
• Retención de Datos: Los resultados de análisis se retienen por 90 días, luego se eliminan automáticamente
• Almacenamiento de Código: No almacenamos permanentemente tu código fuente
• Infraestructura: Alojado en infraestructura cloud segura con auditorías de seguridad regulares`
        },
        {
          title: '4. Compartir Datos',
          content: `No vendemos, alquilamos ni compartimos tu información personal o código con terceros excepto:

• Con tu consentimiento explícito
• Para cumplir con obligaciones legales o solicitudes legales válidas
• Para proteger contra fraude o amenazas de seguridad
• Con proveedores de servicios que asisten en operar nuestro servicio (bajo acuerdos estrictos de confidencialidad)`
        },
        {
          title: '5. Tus Derechos',
          content: `Tienes los siguientes derechos respecto a tus datos:


• Corrección: Solicitar corrección de datos inexactos
• Eliminación: Solicitar eliminación de tus datos
• Exportación: Exportar tus resultados de análisis en formato legible por máquina
• Opt-out: Desinstalar la app en cualquier momento para detener la recopilación de datos`
        },
        {
          title: '6. Contáctanos',
          content: `Si tienes preguntas sobre esta Política de Privacidad o nuestras prácticas de datos, por favor contáctanos:

[EMAIL]jafetcanepa@outlook.es[/EMAIL]
[WEBSITE]coderesolutions.com[/WEBSITE]
[GITHUB]jafcn09[/GITHUB]`
        }
      ]
    },
    termsPage: {
      title: 'Términos de Servicio',
      lastUpdated: 'Última actualización: Enero 2026',
      backButton: '← Volver al Inicio',
      sections: [
        {
          title: '1. Aceptación de Términos',
          content: 'Al instalar y usar PRISM-PR Review, aceptas estar sujeto a estos Términos de Servicio. Si no aceptas estos términos, no instales ni uses el servicio.'
        },
        {
          title: '2. Descripción del Servicio',
          content: `PRISM-PR Review es una GitHub App que proporciona análisis automático de código para pull requests, incluyendo:

• Detección de vulnerabilidades de seguridad
• Recomendaciones de optimización de rendimiento
• Métricas y análisis de calidad de código
• Evaluaciones de complejidad de código
• Aplicación de mejores prácticas`
        },
        {
          title: '3. Responsabilidades del Usuario',
          content: `Aceptas:

• Proporcionar información precisa durante la instalación
• Mantener la seguridad de tu cuenta de GitHub
• Usar el servicio solo para propósitos legales
• No intentar hacer ingeniería inversa, descompilar o hackear el servicio
• No usar el servicio para analizar código malicioso o malware
• Cumplir con todas las leyes y regulaciones aplicables`
        },
        {
          title: '4. Disponibilidad del Servicio',
          content: `Nos esforzamos por proporcionar un servicio confiable pero no garantizamos 100% de uptime o acceso ininterrumpido. Nos reservamos el derecho de modificar, suspender o discontinuar el servicio en cualquier momento con aviso razonable.`
        },
        {
          title: '5. Limitación de Responsabilidad',
          content: `En la máxima medida permitida por la ley:

• No somos responsables por daños indirectos, incidentales o consecuentes
• Nuestra responsabilidad total está limitada al monto que pagaste en los últimos 12 meses
• No somos responsables por pérdida de datos, brechas de seguridad o interrupciones del servicio`
        },
        {
          title: '6. Información de Contacto',
          content: `Para preguntas sobre estos Términos de Servicio:

[EMAIL]jafetcanepa@outlook.es[/EMAIL]
[WEBSITE]coderesolutions.com[/WEBSITE]
[GITHUB]jafcn09[/GITHUB]`
        }
      ]
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