
export enum ProgrammingLanguage {
  TYPESCRIPT = 'typescript',
  JAVASCRIPT = 'javascript',
  JAVA = 'java',
  GO = 'go',
  CSHARP = 'csharp',
  RUST = 'rust',
  DART = 'dart',
  PYTHON = 'python',
  RUBY = 'ruby',
  PHP = 'php',
  SWIFT = 'swift',
  KOTLIN = 'kotlin'
}


export const LANGUAGE_EXTENSIONS: Record<string, ProgrammingLanguage> = {
  '.ts': ProgrammingLanguage.TYPESCRIPT,
  '.tsx': ProgrammingLanguage.TYPESCRIPT,
  '.js': ProgrammingLanguage.JAVASCRIPT,
  '.jsx': ProgrammingLanguage.JAVASCRIPT,
  '.mjs': ProgrammingLanguage.JAVASCRIPT,
  '.cjs': ProgrammingLanguage.JAVASCRIPT,
  '.java': ProgrammingLanguage.JAVA,
  '.go': ProgrammingLanguage.GO,
  '.cs': ProgrammingLanguage.CSHARP,
  '.rs': ProgrammingLanguage.RUST,
  '.dart': ProgrammingLanguage.DART,
  '.py': ProgrammingLanguage.PYTHON,
  '.rb': ProgrammingLanguage.RUBY,
  '.php': ProgrammingLanguage.PHP,
  '.swift': ProgrammingLanguage.SWIFT,
  '.kt': ProgrammingLanguage.KOTLIN,
  '.kts': ProgrammingLanguage.KOTLIN
};


export interface LanguageConfig {
  name: string;
  displayName: string;
  extensions: string[];
  supportsSemanticAnalysis: boolean;
  supportsSyntaxAnalysis: boolean;
  supportsSecurityAnalysis: boolean;
  supportsComplexityAnalysis: boolean;
}

export const LANGUAGE_CONFIGS: Record<ProgrammingLanguage, LanguageConfig> = {
  [ProgrammingLanguage.TYPESCRIPT]: {
    name: 'typescript',
    displayName: 'TypeScript',
    extensions: ['.ts', '.tsx', '.d.ts'],
    supportsSemanticAnalysis: true,
    supportsSyntaxAnalysis: true,
    supportsSecurityAnalysis: true,
    supportsComplexityAnalysis: true
  },
  [ProgrammingLanguage.JAVASCRIPT]: {
    name: 'javascript',
    displayName: 'JavaScript',
    extensions: ['.js', '.jsx', '.mjs', '.cjs'],
    supportsSemanticAnalysis: true,
    supportsSyntaxAnalysis: true,
    supportsSecurityAnalysis: true,
    supportsComplexityAnalysis: true
  },
  [ProgrammingLanguage.JAVA]: {
    name: 'java',
    displayName: 'Java',
    extensions: ['.java'],
    supportsSemanticAnalysis: true,
    supportsSyntaxAnalysis: true,
    supportsSecurityAnalysis: true,
    supportsComplexityAnalysis: true
  },
  [ProgrammingLanguage.GO]: {
    name: 'go',
    displayName: 'Go',
    extensions: ['.go'],
    supportsSemanticAnalysis: true,
    supportsSyntaxAnalysis: true,
    supportsSecurityAnalysis: true,
    supportsComplexityAnalysis: true
  },
  [ProgrammingLanguage.CSHARP]: {
    name: 'csharp',
    displayName: 'C#',
    extensions: ['.cs'],
    supportsSemanticAnalysis: true,
    supportsSyntaxAnalysis: true,
    supportsSecurityAnalysis: true,
    supportsComplexityAnalysis: true
  },
  [ProgrammingLanguage.RUST]: {
    name: 'rust',
    displayName: 'Rust',
    extensions: ['.rs'],
    supportsSemanticAnalysis: true,
    supportsSyntaxAnalysis: true,
    supportsSecurityAnalysis: true,
    supportsComplexityAnalysis: true
  },
  [ProgrammingLanguage.DART]: {
    name: 'dart',
    displayName: 'Dart',
    extensions: ['.dart'],
    supportsSemanticAnalysis: true,
    supportsSyntaxAnalysis: true,
    supportsSecurityAnalysis: true,
    supportsComplexityAnalysis: true
  },
  [ProgrammingLanguage.PYTHON]: {
    name: 'python',
    displayName: 'Python',
    extensions: ['.py', '.pyi'],
    supportsSemanticAnalysis: true,
    supportsSyntaxAnalysis: true,
    supportsSecurityAnalysis: true,
    supportsComplexityAnalysis: true
  },
  [ProgrammingLanguage.RUBY]: {
    name: 'ruby',
    displayName: 'Ruby',
    extensions: ['.rb'],
    supportsSemanticAnalysis: true,
    supportsSyntaxAnalysis: true,
    supportsSecurityAnalysis: true,
    supportsComplexityAnalysis: true
  },
  [ProgrammingLanguage.PHP]: {
    name: 'php',
    displayName: 'PHP',
    extensions: ['.php'],
    supportsSemanticAnalysis: true,
    supportsSyntaxAnalysis: true,
    supportsSecurityAnalysis: true,
    supportsComplexityAnalysis: true
  },
  [ProgrammingLanguage.SWIFT]: {
    name: 'swift',
    displayName: 'Swift',
    extensions: ['.swift'],
    supportsSemanticAnalysis: true,
    supportsSyntaxAnalysis: true,
    supportsSecurityAnalysis: true,
    supportsComplexityAnalysis: true
  },
  [ProgrammingLanguage.KOTLIN]: {
    name: 'kotlin',
    displayName: 'Kotlin',
    extensions: ['.kt', '.kts'],
    supportsSemanticAnalysis: true,
    supportsSyntaxAnalysis: true,
    supportsSecurityAnalysis: true,
    supportsComplexityAnalysis: true
  }
};