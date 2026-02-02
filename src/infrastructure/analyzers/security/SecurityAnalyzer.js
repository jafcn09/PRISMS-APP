import { BaseAnalyzer } from '../BaseAnalyzer.js';
import { AnalyzerType } from '../../../application/interfaces/IAnalyzer.js';
import { IssueSeverity, IssueType } from '../../../domain/entities/AnalysisResult.js';
import { ProgrammingLanguage } from '../../../shared/types/languages.js';
export class SecurityAnalyzer extends BaseAnalyzer {
    constructor(language) {
        super(language, AnalyzerType.SECURITY);
    }
    async findIssues(ast, metadata, code) {
        const issues = [];
        issues.push(...this.checkHardcodedSecrets(code));
        issues.push(...this.checkInsecureRandomness(code));
        issues.push(...this.checkSQLInjection(code));
        issues.push(...this.checkXSS(code));
        issues.push(...this.checkInsecureDeserialization(code));
        return issues;
    }
    checkHardcodedSecrets(code) {
        const issues = [];
        const lines = code.split('\n');
        const secretPatterns = [
            /api[_-]?key\s*[:=]\s*["'][^"']+["']/i,
            /secret\s*[:=]\s*["'][^"']+["']/i,
            /password\s*[:=]\s*["'][^"']+["']/i,
            /token\s*[:=]\s*["'][^"']+["']/i,
            /private[_-]?key\s*[:=]\s*["'][^"']+["']/i
        ];
        lines.forEach((line, index) => {
            for (const pattern of secretPatterns) {
                if (pattern.test(line)) {
                    issues.push(this.createIssue(IssueType.SECURITY, IssueSeverity.CRITICAL, 'Potential hardcoded secret detected', index + 1, 0, 'no-hardcoded-secrets'));
                    break;
                }
            }
        });
        return issues;
    }
    checkInsecureRandomness(code) {
        const issues = [];
        if (code.includes('Math.random()') && this.language === ProgrammingLanguage.JAVASCRIPT) {
            issues.push(this.createIssue(IssueType.SECURITY, IssueSeverity.MEDIUM, 'Math.random() is not cryptographically secure', 1, 0, 'no-insecure-random'));
        }
        return issues;
    }
    checkSQLInjection(code) {
        const issues = [];
        const lines = code.split('\n');
        const sqlPatterns = [
            /query\s*\(\s*["'`].*\+.*["'`]\s*\)/i,
            /execute\s*\(\s*["'`].*\$\{.*\}.*["'`]\s*\)/i,
            /raw\s*\(\s*["'`].*\+.*["'`]\s*\)/i
        ];
        lines.forEach((line, index) => {
            for (const pattern of sqlPatterns) {
                if (pattern.test(line)) {
                    issues.push(this.createIssue(IssueType.SECURITY, IssueSeverity.HIGH, 'Potential SQL injection vulnerability', index + 1, 0, 'no-sql-injection'));
                    break;
                }
            }
        });
        return issues;
    }
    checkXSS(code) {
        const issues = [];
        if (code.includes('innerHTML') || code.includes('dangerouslySetInnerHTML')) {
            issues.push(this.createIssue(IssueType.SECURITY, IssueSeverity.HIGH, 'Potential XSS vulnerability with innerHTML', 1, 0, 'no-unsafe-innerHTML'));
        }
        return issues;
    }
    checkInsecureDeserialization(code) {
        const issues = [];
        if (code.includes('eval(') || code.includes('Function(')) {
            issues.push(this.createIssue(IssueType.SECURITY, IssueSeverity.CRITICAL, 'Dangerous eval() or Function() usage', 1, 0, 'no-eval'));
        }
        return issues;
    }
}
//# sourceMappingURL=SecurityAnalyzer.js.map