import type { AST, CodeMetadata } from './IParser.js';
import type { Issue, CodeMetrics } from '../../domain/entities/AnalysisResult.js';
import { ProgrammingLanguage } from '../../shared/types/languages.js';

export interface IAnalyzer {
  readonly language: ProgrammingLanguage;
  readonly type: AnalyzerType;
  analyze(ast: AST, metadata: CodeMetadata, code: string): Promise<AnalysisOutput>;
}

export enum AnalyzerType {
  SEMANTIC = 'semantic',
  SECURITY = 'security',
  PERFORMANCE = 'performance',
  COMPLEXITY = 'complexity',
  STYLE = 'style',
  BEST_PRACTICES = 'best_practices'
}

export interface AnalysisOutput {
  issues: Issue[];
  metrics: Partial<CodeMetrics>;
  suggestions: Suggestion[];
}

export interface Suggestion {
  type: 'refactor' | 'optimization' | 'security' | 'style';
  message: string;
  priority: 'high' | 'medium' | 'low';
  codeChange?: CodeChange;
}

export interface CodeChange {
  before: string;
  after: string;
  line: number;
  explanation: string;
}