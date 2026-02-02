import { BaseAnalyzer } from '../BaseAnalyzer.js';
import { AnalyzerType } from '../../../application/interfaces/IAnalyzer.js';
import type { AST, CodeMetadata } from '../../../application/interfaces/IParser.js';
import type { Issue } from '../../../domain/entities/AnalysisResult.js';
import { IssueSeverity, IssueType } from '../../../domain/entities/AnalysisResult.js';
import { ProgrammingLanguage } from '../../../shared/types/languages.js';

export class PerformanceAnalyzer extends BaseAnalyzer {
  constructor(language: ProgrammingLanguage) {
    super(language, AnalyzerType.PERFORMANCE);
  }

  protected async findIssues(ast: AST, metadata: CodeMetadata, code: string): Promise<Issue[]> {
    const issues: Issue[] = [];

    issues.push(...this.checkNestedLoops(code));
    issues.push(...this.checkSynchronousIO(code));
    issues.push(...this.checkMemoryLeaks(code));
    issues.push(...this.checkInefficientAlgorithms(code));

    return issues;
  }

  private checkNestedLoops(code: string): Issue[] {
    const issues: Issue[] = [];
    const lines = code.split('\n');

    let forDepth = 0;
    lines.forEach((line, index) => {
      if (/\bfor\s*\(/.test(line) || /\bwhile\s*\(/.test(line)) {
        forDepth++;
        if (forDepth > 2) {
          issues.push(this.createIssue(
            IssueType.PERFORMANCE,
            IssueSeverity.HIGH,
            'Deep nested loops detected (O(n³) or worse complexity)',
            index + 1, 0,
            'no-deep-nested-loops'
          ));
        }
      }
      if (line.includes('}')) {
        forDepth = Math.max(0, forDepth - 1);
      }
    });

    return issues;
  }

  private checkSynchronousIO(code: string): Issue[] {
    const issues: Issue[] = [];

    const syncPatterns = [
      'readFileSync',
      'writeFileSync',
      'appendFileSync',
      'accessSync',
      'statSync',
      'mkdirSync',
      'rmdirSync'
    ];

    for (const pattern of syncPatterns) {
      if (code.includes(pattern)) {
        issues.push(this.createIssue(
          IssueType.PERFORMANCE,
          IssueSeverity.MEDIUM,
          `Synchronous I/O operation '${pattern}' can block event loop`,
          1, 0,
          'no-sync-io'
        ));
      }
    }

    return issues;
  }

  private checkMemoryLeaks(code: string): Issue[] {
    const issues: Issue[] = [];

    const leakPatterns = [
      /addEventListener\s*\([^)]+\)(?!.*removeEventListener)/,
      /setInterval\s*\([^)]+\)(?!.*clearInterval)/,
      /setTimeout\s*\([^)]+\)(?!.*clearTimeout)/
    ];

    for (const pattern of leakPatterns) {
      if (pattern.test(code)) {
        issues.push(this.createIssue(
          IssueType.PERFORMANCE,
          IssueSeverity.MEDIUM,
          'Potential memory leak: listener or timer not cleaned up',
          1, 0,
          'cleanup-resources'
        ));
      }
    }

    return issues;
  }

  private checkInefficientAlgorithms(code: string): Issue[] {
    const issues: Issue[] = [];

    const inefficientPatterns = [
      { pattern: /\.indexOf\(.*\)\s*!==?\s*-1/, replacement: 'includes()' },
      { pattern: /\[\.\.\.(.*?)\]\.reverse\(\)/, replacement: 'Array.from().reverse()' },
      { pattern: /JSON\.parse\(JSON\.stringify\(/, replacement: 'structured clone or lodash.cloneDeep' }
    ];

    for (const { pattern, replacement } of inefficientPatterns) {
      if (pattern.test(code)) {
        issues.push(this.createIssue(
          IssueType.PERFORMANCE,
          IssueSeverity.LOW,
          `Consider using ${replacement} for better performance`,
          1, 0,
          'use-efficient-methods'
        ));
      }
    }

    return issues;
  }
}