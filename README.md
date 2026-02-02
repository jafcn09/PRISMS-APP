# PRISM - Semantic Pull Request Analyzer

[English](#english) | [Español](#español)

---

## English

### Overview

PRISM is an advanced semantic analyzer for GitHub Pull Requests that provides comprehensive code analysis across multiple programming languages. Built with Clean Architecture principles, it delivers detailed insights about code quality, security vulnerabilities, and potential performance issues.

### Features

- **Multi-language Support**: TypeScript, JavaScript, Java, Go, C#, Rust, Dart, Python, Ruby, PHP, Swift, Kotlin
- **Comprehensive Analysis**:
  - Semantic analysis for code quality
  - Security vulnerability detection
  - Performance bottleneck identification
  - Complexity metrics calculation
- **Smart Caching**: LRU cache with TTL for optimized performance
- **Concurrent Processing**: Parallel file analysis with configurable limits
- **GitHub Integration**: Seamless webhook integration for automatic PR analysis
- **Detailed Reports**: Markdown-formatted analysis reports with actionable insights

### Prerequisites

- Node.js 18+
- npm or yarn
- GitHub App credentials

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/prism-app.git
cd prism-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
GITHUB_APP_ID=your_app_id
WEBHOOK_SECRET=your_webhook_secret
PRIVATE_KEY_PATH=./prism.pem
PORT=3000
NODE_ENV=development
```

4. **Add your GitHub App private key**
```bash

chmod 600 prism.pem
```

### Usage

#### Development Mode
```bash
npm run dev
```

#### Production Build
```bash
npm run build
npm run start:prod
```

#### Available Scripts
```bash
npm run dev        # Start development server with hot reload
npm run build      # Build TypeScript to JavaScript
npm run start      # Start production server
npm run lint       # Check for TypeScript errors
npm run clean      # Clean build directory
```

### GitHub App Setup

1. **Create a GitHub App**
   - Go to Settings → Developer settings → GitHub Apps
   - Click "New GitHub App"
   - Configure the following:
     - **Webhook URL**: `https://your-domain.com/webhook`
     - **Webhook Secret**: Your chosen secret
     - **Repository permissions**:
       - Pull requests: Read & Write
       - Contents: Read
       - Issues: Write
     - **Subscribe to events**: Pull request

2. **Install the GitHub App**
   - Install the app on your repositories
   - Copy the Installation ID

3. **Configure PRISM**
   - Add App ID to `.env`
   - Add Webhook Secret to `.env`
   - Save private key as `prism.pem`

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/webhook` | POST | GitHub webhook receiver |
| `/health` | GET | Health check |
| `/stats` | GET | Server statistics |

### Example Webhook Payload

```json
{
  "action": "opened",
  "pull_request": {
    "number": 123,
    "title": "Add new feature",
    "user": {
      "login": "developer"
    },
    "base": {
      "ref": "main"
    },
    "head": {
      "ref": "feature-branch"
    }
  },
  "repository": {
    "name": "my-repo",
    "owner": {
      "login": "organization"
    }
  },
  "installation": {
    "id": 12345678
  }
}
```

### Analysis Report Example

```markdown
# PRISM Analysis Report

**Pull Request:** #123 - Add new feature
**Author:** @developer
**Branch:** `feature-branch` → `main`
**Files Changed:** 5 | **+150** / **-30**

## Summary
- **Total Issues Found:** 3
- **Critical Issues:** 0
- **Languages Analyzed:** TypeScript, JavaScript
- **Risk Score:** 15/100

## Issues by Severity
| Severity | Count | Description |
|----------|-------|-------------|
| Critical | 0 | Security vulnerabilities |
| High | 0 | Significant bugs |
| Medium | 2 | Code quality concerns |
| Low | 1 | Style issues |
```

### Architecture

PRISM follows Clean Architecture principles:

```
src/
├── domain/           # Business entities and logic
├── application/      # Use cases and services
├── infrastructure/   # External implementations
└── presentation/     # API and controllers
```

### Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## Español

### Descripción General

PRISM es un analizador semántico avanzado para Pull Requests de GitHub que proporciona análisis integral de código en múltiples lenguajes de programación. Construido con principios de Arquitectura Limpia, ofrece información detallada sobre calidad de código, vulnerabilidades de seguridad y problemas potenciales de rendimiento.

### Características

- **Soporte Multi-lenguaje**: TypeScript, JavaScript, Java, Go, C#, Rust, Dart, Python, Ruby, PHP, Swift, Kotlin
- **Análisis Integral**:
  - Análisis semántico para calidad de código
  - Detección de vulnerabilidades de seguridad
  - Identificación de cuellos de botella de rendimiento
  - Cálculo de métricas de complejidad
- **Caché Inteligente**: Caché LRU con TTL para rendimiento optimizado
- **Procesamiento Concurrente**: Análisis paralelo de archivos con límites configurables
- **Integración con GitHub**: Integración perfecta con webhooks para análisis automático de PR
- **Reportes Detallados**: Informes en formato Markdown con insights accionables

### Requisitos Previos

- Node.js 18+
- npm o yarn
- Credenciales de GitHub App

### Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/yourusername/prism-app.git
cd prism-app
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
```

Edita `.env` con tu configuración:
```env
GITHUB_APP_ID=tu_app_id
WEBHOOK_SECRET=tu_webhook_secret
PRIVATE_KEY_PATH=./prism.pem
PORT=3000
NODE_ENV=development
```

4. **Agregar tu clave privada de GitHub App**
```bash
# Guarda tu clave privada de GitHub App como prism.pem en el directorio raíz
# Asegura los permisos adecuados
chmod 600 prism.pem
```

### Uso

#### Modo Desarrollo
```bash
npm run dev
```

#### Compilación para Producción
```bash
npm run build
npm run start:prod
```

#### Scripts Disponibles
```bash
npm run dev        # Iniciar servidor de desarrollo con recarga en caliente
npm run build      # Compilar TypeScript a JavaScript
npm run start      # Iniciar servidor de producción
npm run lint       # Verificar errores de TypeScript
npm run clean      # Limpiar directorio de compilación
```

### Configuración de GitHub App

1. **Crear una GitHub App**
   - Ir a Configuración → Configuración de desarrollador → GitHub Apps
   - Hacer clic en "Nueva GitHub App"
   - Configurar lo siguiente:
     - **URL del Webhook**: `https://tu-dominio.com/webhook`
     - **Secreto del Webhook**: Tu secreto elegido
     - **Permisos del repositorio**:
       - Pull requests: Lectura y Escritura
       - Contenidos: Lectura
       - Issues: Escritura
     - **Suscribirse a eventos**: Pull request

2. **Instalar la GitHub App**
   - Instalar la app en tus repositorios
   - Copiar el ID de instalación

3. **Configurar PRISM**
   - Agregar App ID al `.env`
   - Agregar Webhook Secret al `.env`
   - Guardar clave privada como `prism.pem`

### Endpoints de API

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/webhook` | POST | Receptor de webhook de GitHub |
| `/health` | GET | Verificación de salud |
| `/stats` | GET | Estadísticas del servidor |

### Ejemplo de Payload del Webhook

```json
{
  "action": "opened",
  "pull_request": {
    "number": 123,
    "title": "Agregar nueva funcionalidad",
    "user": {
      "login": "desarrollador"
    },
    "base": {
      "ref": "main"
    },
    "head": {
      "ref": "rama-funcionalidad"
    }
  },
  "repository": {
    "name": "mi-repo",
    "owner": {
      "login": "organizacion"
    }
  },
  "installation": {
    "id": 12345678
  }
}
```

### Ejemplo de Reporte de Análisis

```markdown
# Reporte de Análisis PRISM

**Pull Request:** #123 - Agregar nueva funcionalidad
**Autor:** Jhafet Cánepa
**Rama:** `rama-funcionalidad` → `main`
**Archivos Cambiados:** 5 | **+150** / **-30**

## Resumen
- **Total de Problemas Encontrados:** 3
- **Problemas Críticos:** 0
- **Lenguajes Analizados:** TypeScript, JavaScript
- **Puntuación de Riesgo:** 15/100

## Problemas por Severidad
| Severidad | Cantidad | Descripción |
|-----------|----------|-------------|
| Crítico | 0 | Vulnerabilidades de seguridad |
| Alto | 0 | Bugs significativos |
| Medio | 2 | Problemas de calidad de código |
| Bajo | 1 | Problemas de estilo |
```

### Arquitectura

PRISM sigue principios de Arquitectura Limpia:

```
src/
├── domain/           # Entidades y lógica de negocio
├── application/      # Casos de uso y servicios
├── infrastructure/   # Implementaciones externas
└── presentation/     # API y controladores
```

### Contribuir

1. Hacer fork del repositorio
2. Crear tu rama de funcionalidad (`git checkout -b feature/funcionalidad-increible`)
3. Hacer commit de tus cambios (`git commit -m 'Agregar funcionalidad increíble'`)
4. Hacer push a la rama (`git push origin feature/funcionalidad-increible`)
5. Abrir un Pull Request

---

## License

MIT License - See [LICENSE](LICENSE) file for details

## Support

For issues and questions, please open an issue on GitHub.

## Acknowledgments

Built with TypeScript, Express.js, and love for clean code.