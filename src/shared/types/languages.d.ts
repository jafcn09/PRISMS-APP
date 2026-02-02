export declare enum ProgrammingLanguage {
    TYPESCRIPT = "typescript",
    JAVASCRIPT = "javascript",
    JAVA = "java",
    GO = "go",
    CSHARP = "csharp",
    RUST = "rust",
    DART = "dart",
    PYTHON = "python",
    RUBY = "ruby",
    PHP = "php",
    SWIFT = "swift",
    KOTLIN = "kotlin"
}
export declare const LANGUAGE_EXTENSIONS: Record<string, ProgrammingLanguage>;
export interface LanguageConfig {
    name: string;
    displayName: string;
    extensions: string[];
    supportsSemanticAnalysis: boolean;
    supportsSyntaxAnalysis: boolean;
    supportsSecurityAnalysis: boolean;
    supportsComplexityAnalysis: boolean;
}
export declare const LANGUAGE_CONFIGS: Record<ProgrammingLanguage, LanguageConfig>;
//# sourceMappingURL=languages.d.ts.map