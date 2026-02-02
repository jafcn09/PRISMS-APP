export var ProgrammingLanguage;
(function (ProgrammingLanguage) {
    ProgrammingLanguage["TYPESCRIPT"] = "typescript";
    ProgrammingLanguage["JAVASCRIPT"] = "javascript";
    ProgrammingLanguage["JAVA"] = "java";
    ProgrammingLanguage["GO"] = "go";
    ProgrammingLanguage["CSHARP"] = "csharp";
    ProgrammingLanguage["RUST"] = "rust";
    ProgrammingLanguage["DART"] = "dart";
    ProgrammingLanguage["PYTHON"] = "python";
    ProgrammingLanguage["RUBY"] = "ruby";
    ProgrammingLanguage["PHP"] = "php";
    ProgrammingLanguage["SWIFT"] = "swift";
    ProgrammingLanguage["KOTLIN"] = "kotlin";
})(ProgrammingLanguage || (ProgrammingLanguage = {}));
export const LANGUAGE_EXTENSIONS = {
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
export const LANGUAGE_CONFIGS = {
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
//# sourceMappingURL=languages.js.map