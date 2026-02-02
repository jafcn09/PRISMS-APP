import type { IAnalyzer } from '../../application/interfaces/IAnalyzer.js';
import { AnalyzerType } from '../../application/interfaces/IAnalyzer.js';
import { ProgrammingLanguage } from '../../shared/types/languages.js';
export declare class AnalyzerFactory {
    private static analyzers;
    private static registerAnalyzers;
    static getAnalyzer(language: ProgrammingLanguage, type: AnalyzerType): IAnalyzer;
    static getAnalyzersForLanguage(language: ProgrammingLanguage): IAnalyzer[];
    private static registerAnalyzer;
    static hasAnalyzer(language: ProgrammingLanguage, type: AnalyzerType): boolean;
}
//# sourceMappingURL=AnalyzerFactory.d.ts.map