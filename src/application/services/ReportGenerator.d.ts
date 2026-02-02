import type { AnalysisResult } from '../../domain/entities/AnalysisResult.js';
import type { PullRequest } from '../../domain/entities/PullRequest.js';
export declare class ReportGenerator {
    generateMarkdownReport(pullRequest: PullRequest, results: AnalysisResult[]): string;
    private generateHeader;
    private generateSummary;
    private generateRiskAssessment;
    private generateIssuesSummary;
    private generateMetrics;
    private generateDetailedIssues;
    private generateRecommendations;
    private calculateOverallRiskScore;
    private getRiskFactors;
    private calculateAverageMetric;
    private getComplexityStatus;
    private getMaintainabilityStatus;
}
//# sourceMappingURL=ReportGenerator.d.ts.map