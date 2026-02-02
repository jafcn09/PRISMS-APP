import { ProgrammingLanguage } from '../../shared/types/languages.js';

export class AnalysisResult {
  constructor(
    public readonly id: string,
    public readonly pullRequestId: string,
    public readonly language: ProgrammingLanguage,
    public readonly filePath: string,
    public readonly issues: Issue[],
    public readonly metrics: CodeMetrics,
    public readonly timestamp: Date
  ) {}

  getSeverityCount(): Record<IssueSeverity, number> {
    return this.issues.reduce((acc, issue) => {
      acc[issue.severity] = (acc[issue.severity] || 0) + 1;
      return acc;
    }, {} as Record<IssueSeverity, number>);
  }

  getCriticalIssues(): Issue[] {
    return this.issues.filter(i => i.severity === IssueSeverity.CRITICAL);
  }

  getRiskScore(): number {
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

    if (this.metrics.cyclomaticComplexity > 20) score += 20;
    else if (this.metrics.cyclomaticComplexity > 10) score += 10;

    return Math.min(100, score);
  }
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

export enum IssueType {
  SECURITY = 'security',
  PERFORMANCE = 'performance',
  BUG = 'bug',
  CODE_SMELL = 'code_smell',
  DUPLICATION = 'duplication',
  COMPLEXITY = 'complexity',
  STYLE = 'style',
  BEST_PRACTICE = 'best_practice'
}

export enum IssueSeverity {
  CRITICAL = 'critical',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
  INFO = 'info'
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