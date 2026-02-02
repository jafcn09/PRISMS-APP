import { BaseAnalyzer } from '../BaseAnalyzer.js';
import type { AST, CodeMetadata } from '../../../application/interfaces/IParser.js';
import type { Issue } from '../../../domain/entities/AnalysisResult.js';
import { ProgrammingLanguage } from '../../../shared/types/languages.js';
export declare class SemanticAnalyzer extends BaseAnalyzer {
    constructor(language: ProgrammingLanguage);
    protected findIssues(ast: AST, metadata: CodeMetadata, code: string): Promise<Issue[]>;
    private checkUnusedImports;
    private checkUnusedVariables;
    private checkUnreachableCode;
    private checkInconsistentNaming;
    private isCamelCase;
    private isSnakeCase;
}
//# sourceMappingURL=SemanticAnalyzer.d.ts.map