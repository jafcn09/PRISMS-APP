import { BaseAnalyzer } from '../BaseAnalyzer.js';
import { AnalyzerType } from '../../../application/interfaces/IAnalyzer.js';
import { IssueSeverity, IssueType } from '../../../domain/entities/AnalysisResult.js';
import { ProgrammingLanguage } from '../../../shared/types/languages.js';
export class SemanticAnalyzer extends BaseAnalyzer {
    constructor(language) {
        super(language, AnalyzerType.SEMANTIC);
    }
    async findIssues(ast, metadata, code) {
        const issues = [];
        issues.push(...this.checkUnusedImports(metadata));
        issues.push(...this.checkUnusedVariables(metadata));
        issues.push(...this.checkUnreachableCode(ast));
        issues.push(...this.checkInconsistentNaming(metadata));
        return issues;
    }
    checkUnusedImports(metadata) {
        const issues = [];
        const usedIdentifiers = new Set();
        for (const func of metadata.functions) {
            usedIdentifiers.add(func.name);
        }
        for (const cls of metadata.classes) {
            usedIdentifiers.add(cls.name);
        }
        for (const imp of metadata.imports) {
            if (!usedIdentifiers.has(imp)) {
                issues.push(this.createIssue(IssueType.CODE_SMELL, IssueSeverity.LOW, `Unused import: ${imp}`, 1, 0, 'no-unused-imports'));
            }
        }
        return issues;
    }
    checkUnusedVariables(metadata) {
        const issues = [];
        for (const variable of metadata.variables) {
            if (variable.name.startsWith('_unused')) {
                issues.push(this.createIssue(IssueType.CODE_SMELL, IssueSeverity.LOW, `Unused variable: ${variable.name}`, variable.loc.start.line, variable.loc.start.column, 'no-unused-vars'));
            }
        }
        return issues;
    }
    checkUnreachableCode(ast) {
        return [];
    }
    checkInconsistentNaming(metadata) {
        const issues = [];
        for (const func of metadata.functions) {
            if (func.name && !this.isCamelCase(func.name) && !this.isSnakeCase(func.name)) {
                issues.push(this.createIssue(IssueType.STYLE, IssueSeverity.INFO, `Inconsistent naming: ${func.name}`, func.loc.start.line, func.loc.start.column, 'naming-convention'));
            }
        }
        return issues;
    }
    isCamelCase(name) {
        return /^[a-z][a-zA-Z0-9]*$/.test(name);
    }
    isSnakeCase(name) {
        return /^[a-z][a-z0-9_]*$/.test(name);
    }
}
//# sourceMappingURL=SemanticAnalyzer.js.map