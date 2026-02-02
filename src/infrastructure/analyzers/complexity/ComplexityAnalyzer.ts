import { BaseAnalyzer } from '../BaseAnalyzer.js';
import { AnalyzerType } from '../../../application/interfaces/IAnalyzer.js';
import type { AST, CodeMetadata, FunctionMetadata } from '../../../application/interfaces/IParser.js';
import type { Issue } from '../../../domain/entities/AnalysisResult.js';
import { IssueSeverity, IssueType } from '../../../domain/entities/AnalysisResult.js';
import { ProgrammingLanguage } from '../../../shared/types/languages.js';

export class ComplexityAnalyzer extends BaseAnalyzer {
  constructor(language: ProgrammingLanguage) {
    super(language, AnalyzerType.COMPLEXITY);
  }

  protected async findIssues(ast: AST, metadata: CodeMetadata, code: string): Promise<Issue[]> {
    const issues: Issue[] = [];

    issues.push(...this.checkCyclomaticComplexity(metadata));
    issues.push(...this.checkNestingDepth(ast, code));
    issues.push(...this.checkMethodLength(metadata));
    issues.push(...this.checkParameterCount(metadata));

    return issues;
  }

  private checkCyclomaticComplexity(metadata: CodeMetadata): Issue[] {
    const issues: Issue[] = [];
    const MAX_COMPLEXITY = 10;

    for (const func of metadata.functions) {
      if (func.complexity > MAX_COMPLEXITY) {
        issues.push(this.createIssue(
          IssueType.COMPLEXITY,
          IssueSeverity.HIGH,
          `Function '${func.name}' has high cyclomatic complexity (${func.complexity})`,
          func.loc.start.line,
          func.loc.start.column,
          'max-complexity'
        ));
      }
    }

    return issues;
  }

  private checkNestingDepth(ast: AST, code: string): Issue[] {
    const issues: Issue[] = [];
    const MAX_DEPTH = 4;
    const lines = code.split('\n');

    let currentDepth = 0;
    let maxDepth = 0;

    lines.forEach((line, index) => {
      const openBraces = (line.match(/{/g) || []).length;
      const closeBraces = (line.match(/}/g) || []).length;

      currentDepth += openBraces - closeBraces;
      maxDepth = Math.max(maxDepth, currentDepth);

      if (currentDepth > MAX_DEPTH) {
        issues.push(this.createIssue(
          IssueType.COMPLEXITY,
          IssueSeverity.MEDIUM,
          `Excessive nesting depth (${currentDepth})`,
          index + 1, 0,
          'max-nesting'
        ));
      }
    });

    return issues;
  }

  private checkMethodLength(metadata: CodeMetadata): Issue[] {
    const issues: Issue[] = [];
    const MAX_LINES = 50;

    for (const func of metadata.functions) {
      const lines = func.loc.end.line - func.loc.start.line;
      if (lines > MAX_LINES) {
        issues.push(this.createIssue(
          IssueType.COMPLEXITY,
          IssueSeverity.MEDIUM,
          `Function '${func.name}' is too long (${lines} lines)`,
          func.loc.start.line,
          func.loc.start.column,
          'max-lines-per-function'
        ));
      }
    }

    return issues;
  }

  private checkParameterCount(metadata: CodeMetadata): Issue[] {
    const issues: Issue[] = [];
    const MAX_PARAMS = 5;

    for (const func of metadata.functions) {
      if (func.parameters.length > MAX_PARAMS) {
        issues.push(this.createIssue(
          IssueType.COMPLEXITY,
          IssueSeverity.MEDIUM,
          `Function '${func.name}' has too many parameters (${func.parameters.length})`,
          func.loc.start.line,
          func.loc.start.column,
          'max-params'
        ));
      }
    }

    return issues;
  }
}