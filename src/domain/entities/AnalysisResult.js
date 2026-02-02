import { ProgrammingLanguage } from '../../shared/types/languages.js';
export class AnalysisResult {
    id;
    pullRequestId;
    language;
    filePath;
    issues;
    metrics;
    timestamp;
    constructor(id, pullRequestId, language, filePath, issues, metrics, timestamp) {
        this.id = id;
        this.pullRequestId = pullRequestId;
        this.language = language;
        this.filePath = filePath;
        this.issues = issues;
        this.metrics = metrics;
        this.timestamp = timestamp;
    }
    getSeverityCount() {
        return this.issues.reduce((acc, issue) => {
            acc[issue.severity] = (acc[issue.severity] || 0) + 1;
            return acc;
        }, {});
    }
    getCriticalIssues() {
        return this.issues.filter(i => i.severity === IssueSeverity.CRITICAL);
    }
    getRiskScore() {
        let score = 0;
        const severityWeights = {
            [IssueSeverity.CRITICAL]: 25,
            [IssueSeverity.HIGH]: 15,
            [IssueSeverity.MEDIUM]: 8,
            [IssueSeverity.LOW]: 3,
            [IssueSeverity.INFO]: 1
        };
        for (const issue of this.issues) {
            score += severityWeights[issue.severity];
        }
        if (this.metrics.cyclomaticComplexity > 20)
            score += 20;
        else if (this.metrics.cyclomaticComplexity > 10)
            score += 10;
        return Math.min(100, score);
    }
}
export var IssueType;
(function (IssueType) {
    IssueType["SECURITY"] = "security";
    IssueType["PERFORMANCE"] = "performance";
    IssueType["BUG"] = "bug";
    IssueType["CODE_SMELL"] = "code_smell";
    IssueType["DUPLICATION"] = "duplication";
    IssueType["COMPLEXITY"] = "complexity";
    IssueType["STYLE"] = "style";
    IssueType["BEST_PRACTICE"] = "best_practice";
})(IssueType || (IssueType = {}));
export var IssueSeverity;
(function (IssueSeverity) {
    IssueSeverity["CRITICAL"] = "critical";
    IssueSeverity["HIGH"] = "high";
    IssueSeverity["MEDIUM"] = "medium";
    IssueSeverity["LOW"] = "low";
    IssueSeverity["INFO"] = "info";
})(IssueSeverity || (IssueSeverity = {}));
//# sourceMappingURL=AnalysisResult.js.map