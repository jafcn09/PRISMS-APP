import type { IAnalyzer } from '../../application/interfaces/IAnalyzer.js';
import { AnalyzerType } from '../../application/interfaces/IAnalyzer.js';
import { ProgrammingLanguage } from '../../shared/types/languages.js';
import { SemanticAnalyzer } from './semantic/SemanticAnalyzer.js';
import { SecurityAnalyzer } from './security/SecurityAnalyzer.js';
import { ComplexityAnalyzer } from './complexity/ComplexityAnalyzer.js';
import { PerformanceAnalyzer } from './performance/PerformanceAnalyzer.js';

export class AnalyzerFactory {
  private static analyzers = new Map<string, IAnalyzer>();

  static {
    this.registerAnalyzers();
  }

  private static registerAnalyzers(): void {
    const languages = Object.values(ProgrammingLanguage);

    for (const language of languages) {
      this.registerAnalyzer(new SemanticAnalyzer(language));
      this.registerAnalyzer(new SecurityAnalyzer(language));
      this.registerAnalyzer(new ComplexityAnalyzer(language));
      this.registerAnalyzer(new PerformanceAnalyzer(language));
    }
  }

  static getAnalyzer(language: ProgrammingLanguage, type: AnalyzerType): IAnalyzer {
    const key = `${language}:${type}`;
    const analyzer = this.analyzers.get(key);
    if (!analyzer) {
      throw new Error(`No analyzer available for ${language} - ${type}`);
    }
    return analyzer;
  }

  static getAnalyzersForLanguage(language: ProgrammingLanguage): IAnalyzer[] {
    const result: IAnalyzer[] = [];
    for (const [key, analyzer] of this.analyzers.entries()) {
      if (key.startsWith(`${language}:`)) {
        result.push(analyzer);
      }
    }
    return result;
  }

  private static registerAnalyzer(analyzer: IAnalyzer): void {
    const key = `${analyzer.language}:${analyzer.type}`;
    this.analyzers.set(key, analyzer);
  }

  static hasAnalyzer(language: ProgrammingLanguage, type: AnalyzerType): boolean {
    return this.analyzers.has(`${language}:${type}`);
  }
}