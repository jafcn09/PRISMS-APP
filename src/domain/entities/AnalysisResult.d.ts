import { ProgrammingLanguage } from '../../shared/types/languages.js';
export declare class AnalysisResult {
    readonly id: string;
    readonly pullRequestId: string;
    readonly language: ProgrammingLanguage;
    readonly filePath: string;
    readonly issues: Issue[];
    readonly metrics: CodeMetrics;
    readonly timestamp: Date;
    constructor(id: string, pullRequestId: string, language: ProgrammingLanguage, filePath: string, issues: Issue[], metrics: CodeMetrics, timestamp: Date);
    getSeverityCount(): Record<IssueSeverity, number>;
    getCriticalIssues(): Issue[];
    getRiskScore(): number;
}
export interface Issue {
    id: string;
    type: IssueType;
    severity: IssueSeverity;
    message: string;
    line: number;
    column: number;
    rule: string;
    suggestion?: string;
    codeSnippet?: string;
}
export declare enum IssueType {
    SECURITY = "security",
    PERFORMANCE = "performance",
    BUG = "bug",
    CODE_SMELL = "code_smell",
    DUPLICATION = "duplication",
    COMPLEXITY = "complexity",
    STYLE = "style",
    BEST_PRACTICE = "best_practice"
}
export declare enum IssueSeverity {
    CRITICAL = "critical",
    HIGH = "high",
    MEDIUM = "medium",
    LOW = "low",
    INFO = "info"
}
export interface CodeMetrics {
    linesOfCode: number;
    cyclomaticComplexity: number;
    cognitiveComplexity: number;
    maintainabilityIndex: number;
    testCoverage?: number;
    duplicatedLines: number;
    technicalDebt: number;
}
//# sourceMappingURL=AnalysisResult.d.ts.map