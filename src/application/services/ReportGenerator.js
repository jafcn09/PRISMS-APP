import { IssueSeverity } from '../../domain/entities/AnalysisResult.js';
export class ReportGenerator {
    generateMarkdownReport(pullRequest, results) {
        const sections = [];
        sections.push(this.generateHeader(pullRequest));
        sections.push(this.generateSummary(pullRequest, results));
        sections.push(this.generateRiskAssessment(pullRequest, results));
        sections.push(this.generateIssuesSummary(results));
        sections.push(this.generateMetrics(results));
        sections.push(this.generateDetailedIssues(results));
        sections.push(this.generateRecommendations(results));
        return sections.join('\n\n');
    }
    generateHeader(pullRequest) {
        return `# PRISM Analysis Report

**Pull Request:** #${pullRequest.number} - ${pullRequest.title}
**Author:** @${pullRequest.author}
**Branch:** \`${pullRequest.headBranch}\` → \`${pullRequest.baseBranch}\`
**Files Changed:** ${pullRequest.filesChanged.length} | **+${pullRequest.additions}** / **-${pullRequest.deletions}**`;
    }
    generateSummary(pullRequest, results) {
        const totalIssues = results.reduce((sum, r) => sum + r.issues.length, 0);
        const criticalIssues = results.reduce((sum, r) => sum + r.getCriticalIssues().length, 0);
        const languages = pullRequest.getAffectedLanguages();
        return `## Summary

- **Total Issues Found:** ${totalIssues}
- **Critical Issues:** ${criticalIssues}
- **Languages Analyzed:** ${Array.from(languages).join(', ')}
- **Risk Score:** ${this.calculateOverallRiskScore(pullRequest, results)}/100`;
    }
    generateRiskAssessment(pullRequest, results) {
        const riskScore = this.calculateOverallRiskScore(pullRequest, results);
        let level = 'Low';
        if (riskScore > 75) {
            level = 'Critical';
        }
        else if (riskScore > 50) {
            level = 'High';
        }
        else if (riskScore > 25) {
            level = 'Medium';
        }
        return `## Risk Assessment: ${level} (${riskScore}/100)

${this.getRiskFactors(pullRequest, results).join('\n')}`;
    }
    generateIssuesSummary(results) {
        const severityCounts = {
            [IssueSeverity.CRITICAL]: 0,
            [IssueSeverity.HIGH]: 0,
            [IssueSeverity.MEDIUM]: 0,
            [IssueSeverity.LOW]: 0,
            [IssueSeverity.INFO]: 0
        };
        for (const result of results) {
            const counts = result.getSeverityCount();
            for (const [severity, count] of Object.entries(counts)) {
                severityCounts[severity] += count;
            }
        }
        return `## Issues by Severity

| Severity | Count | Description |
|----------|-------|-------------|
| Critical | ${severityCounts[IssueSeverity.CRITICAL]} | Security vulnerabilities, breaking changes |
| High | ${severityCounts[IssueSeverity.HIGH]} | Significant bugs, performance issues |
| Medium | ${severityCounts[IssueSeverity.MEDIUM]} | Code quality, maintainability concerns |
| Low | ${severityCounts[IssueSeverity.LOW]} | Style issues, minor improvements |
| Info | ${severityCounts[IssueSeverity.INFO]} | Suggestions, best practices |`;
    }
    generateMetrics(results) {
        const avgComplexity = this.calculateAverageMetric(results, 'cyclomaticComplexity');
        const avgMaintainability = this.calculateAverageMetric(results, 'maintainabilityIndex');
        const totalLOC = results.reduce((sum, r) => sum + r.metrics.linesOfCode, 0);
        return `## Code Metrics

| Metric | Value | Status |
|--------|-------|--------|
| Cyclomatic Complexity | ${avgComplexity.toFixed(1)} | ${this.getComplexityStatus(avgComplexity)} |
| Maintainability Index | ${avgMaintainability.toFixed(1)} | ${this.getMaintainabilityStatus(avgMaintainability)} |
| Lines of Code | ${totalLOC} | - |`;
    }
    generateDetailedIssues(results) {
        const criticalAndHigh = results.flatMap(r => r.issues.filter(i => i.severity === IssueSeverity.CRITICAL ||
            i.severity === IssueSeverity.HIGH).map(i => ({ ...i, file: r.filePath })));
        if (criticalAndHigh.length === 0) {
            return '## No Critical or High Priority Issues Found';
        }
        const issuesList = criticalAndHigh
            .slice(0, 10)
            .map(issue => `- **[${issue.severity.toUpperCase()}]** \`${issue.file}:${issue.line}\` - ${issue.message}`)
            .join('\n');
        return `## Top Issues Requiring Attention

${issuesList}`;
    }
    generateRecommendations(results) {
        const recommendations = [];
        const totalIssues = results.reduce((sum, r) => sum + r.issues.length, 0);
        const criticalCount = results.reduce((sum, r) => sum + r.getCriticalIssues().length, 0);
        if (criticalCount > 0) {
            recommendations.push('**Address critical security vulnerabilities immediately**');
        }
        if (this.calculateAverageMetric(results, 'cyclomaticComplexity') > 10) {
            recommendations.push('**Refactor complex functions to improve maintainability**');
        }
        if (totalIssues > 50) {
            recommendations.push('**Consider breaking this PR into smaller, focused changes**');
        }
        if (recommendations.length === 0) {
            recommendations.push('**Code quality meets standards. Ready for review.**');
        }
        return `## Recommendations

${recommendations.join('\n')}`;
    }
    calculateOverallRiskScore(pullRequest, results) {
        const prRisk = pullRequest.calculateRiskScore();
        const avgAnalysisRisk = results.length > 0
            ? results.reduce((sum, r) => sum + r.getRiskScore(), 0) / results.length
            : 0;
        return Math.round((prRisk + avgAnalysisRisk) / 2);
    }
    getRiskFactors(pullRequest, results) {
        const factors = [];
        const criticalCount = results.reduce((sum, r) => sum + r.getCriticalIssues().length, 0);
        if (criticalCount > 0) {
            factors.push(`- ${criticalCount} critical issue(s) found`);
        }
        if (pullRequest.filesChanged.length > 20) {
            factors.push('- Large number of files changed');
        }
        if (pullRequest.additions + pullRequest.deletions > 500) {
            factors.push('- Significant code changes');
        }
        return factors;
    }
    calculateAverageMetric(results, metric) {
        if (results.length === 0)
            return 0;
        return results.reduce((sum, r) => sum + (r.metrics[metric] || 0), 0) / results.length;
    }
    getComplexityStatus(complexity) {
        if (complexity <= 5)
            return 'Excellent';
        if (complexity <= 10)
            return 'Good';
        if (complexity <= 20)
            return 'Moderate';
        return 'High';
    }
    getMaintainabilityStatus(index) {
        if (index >= 80)
            return 'Excellent';
        if (index >= 60)
            return 'Good';
        if (index >= 40)
            return 'Moderate';
        return 'Poor';
    }
}
//# sourceMappingURL=ReportGenerator.js.map