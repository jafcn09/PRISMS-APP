import type { IAnalyzer, AnalysisOutput } from '../../application/interfaces/IAnalyzer.js';
import { AnalyzerType } from '../../application/interfaces/IAnalyzer.js';
import type { AST, CodeMetadata } from '../../application/interfaces/IParser.js';
import type { Issue, CodeMetrics } from '../../domain/entities/AnalysisResult.js';
import { IssueSeverity, IssueType } from '../../domain/entities/AnalysisResult.js';
import { ProgrammingLanguage } from '../../shared/types/languages.js';
export declare abstract class BaseAnalyzer implements IAnalyzer {
    readonly language: ProgrammingLanguage;
    readonly type: AnalyzerType;
    constructor(language: ProgrammingLanguage, type: AnalyzerType);
    analyze(ast: AST, metadata: CodeMetadata, code: string): Promise<AnalysisOutput>;
    protected abstract findIssues(ast: AST, metadata: CodeMetadata, code: string): Promise<Issue[]>;
    protected calculateMetrics(ast: AST, metadata: CodeMetadata, code: string): Promise<Partial<CodeMetrics>>;
    protected generateSuggestions(issues: Issue[], metrics: Partial<CodeMetrics>): Promise<any[]>;
    protected calculateComplexity(metadata: CodeMetadata): number;
    protected createIssue(type: IssueType, severity: IssueSeverity, message: string, line: number, column: number, rule: string): Issue;
}
//# sourceMappingURL=BaseAnalyzer.d.ts.map