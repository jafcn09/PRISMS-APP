import { AnalyzerType } from '../../application/interfaces/IAnalyzer.js';
import { IssueSeverity, IssueType } from '../../domain/entities/AnalysisResult.js';
import { ProgrammingLanguage } from '../../shared/types/languages.js';
export class BaseAnalyzer {
    language;
    type;
    constructor(language, type) {
        this.language = language;
        this.type = type;
    }
    async analyze(ast, metadata, code) {
        const issues = await this.findIssues(ast, metadata, code);
        const metrics = await this.calculateMetrics(ast, metadata, code);
        const suggestions = await this.generateSuggestions(issues, metrics);
        return { issues, metrics, suggestions };
    }
    async calculateMetrics(ast, metadata, code) {
        return {
            linesOfCode: code.split('\n').length,
            cyclomaticComplexity: this.calculateComplexity(metadata),
            duplicatedLines: 0,
            technicalDebt: 0
        };
    }
    async generateSuggestions(issues, metrics) {
        return [];
    }
    calculateComplexity(metadata) {
        let complexity = 1;
        for (const func of metadata.functions) {
            complexity += func.complexity || 1;
        }
        return complexity;
    }
    createIssue(type, severity, message, line, column, rule) {
        return {
            id: `${this.type}-${Date.now()}-${Math.random()}`,
            type,
            severity,
            message,
            line,
            column,
            rule
        };
    }
}
//# sourceMappingURL=BaseAnalyzer.js.map