import { BaseAnalyzer } from '../BaseAnalyzer.js';
import type { AST, CodeMetadata } from '../../../application/interfaces/IParser.js';
import type { Issue } from '../../../domain/entities/AnalysisResult.js';
import { ProgrammingLanguage } from '../../../shared/types/languages.js';
export declare class SecurityAnalyzer extends BaseAnalyzer {
    constructor(language: ProgrammingLanguage);
    protected findIssues(ast: AST, metadata: CodeMetadata, code: string): Promise<Issue[]>;
    private checkHardcodedSecrets;
    private checkInsecureRandomness;
    private checkSQLInjection;
    private checkXSS;
    private checkInsecureDeserialization;
}
//# sourceMappingURL=SecurityAnalyzer.d.ts.map