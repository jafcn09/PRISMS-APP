import type { IAnalyzer, AnalysisOutput } from '../../application/interfaces/IAnalyzer.js';
import { AnalyzerType } from '../../application/interfaces/IAnalyzer.js';
import type { AST, CodeMetadata } from '../../application/interfaces/IParser.js';
import type { Issue, CodeMetrics } from '../../domain/entities/AnalysisResult.js';
import { IssueSeverity, IssueType } from '../../domain/entities/AnalysisResult.js';
import { ProgrammingLanguage } from '../../shared/types/languages.js';

export abstract class BaseAnalyzer implements IAnalyzer {
  constructor(
    public readonly language: ProgrammingLanguage,
    public readonly type: AnalyzerType
  ) {}

  async analyze(ast: AST, metadata: CodeMetadata, code: string): Promise<AnalysisOutput> {
    const issues = await this.findIssues(ast, metadata, code);
    const metrics = await this.calculateMetrics(ast, metadata, code);
    const suggestions = await this.generateSuggestions(issues, metrics);

    return { issues, metrics, suggestions };
  }

  protected abstract findIssues(ast: AST, metadata: CodeMetadata, code: string): Promise<Issue[]>;

  protected async calculateMetrics(ast: AST, metadata: CodeMetadata, code: string): Promise<Partial<CodeMetrics>> {
    return {
      linesOfCode: code.split('\n').length,
      cyclomaticComplexity: this.calculateComplexity(metadata),
      duplicatedLines: 0,
      technicalDebt: 0
    };
  }

  protected async generateSuggestions(issues: Issue[], metrics: Partial<CodeMetrics>): Promise<any[]> {
    return [];
  }

  protected calculateComplexity(metadata: CodeMetadata): number {
    let complexity = 1;
    for (const func of metadata.functions) {
      complexity += func.complexity || 1;
    }
    return complexity;
  }

  protected createIssue(
    type: IssueType,
    severity: IssueSeverity,
    message: string,
    line: number,
    column: number,
    rule: string
  ): Issue {
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