import { AnalyzerType } from '../../application/interfaces/IAnalyzer.js';
import { ProgrammingLanguage } from '../../shared/types/languages.js';
import { SemanticAnalyzer } from './semantic/SemanticAnalyzer.js';
import { SecurityAnalyzer } from './security/SecurityAnalyzer.js';
import { ComplexityAnalyzer } from './complexity/ComplexityAnalyzer.js';
import { PerformanceAnalyzer } from './performance/PerformanceAnalyzer.js';
export class AnalyzerFactory {
    static analyzers = new Map();
    static {
        this.registerAnalyzers();
    }
    static registerAnalyzers() {
        const languages = Object.values(ProgrammingLanguage);
        for (const language of languages) {
            this.registerAnalyzer(new SemanticAnalyzer(language));
            this.registerAnalyzer(new SecurityAnalyzer(language));
            this.registerAnalyzer(new ComplexityAnalyzer(language));
            this.registerAnalyzer(new PerformanceAnalyzer(language));
        }
    }
    static getAnalyzer(language, type) {
        const key = `${language}:${type}`;
        const analyzer = this.analyzers.get(key);
        if (!analyzer) {
            throw new Error(`No analyzer available for ${language} - ${type}`);
        }
        return analyzer;
    }
    static getAnalyzersForLanguage(language) {
        const result = [];
        for (const [key, analyzer] of this.analyzers.entries()) {
            if (key.startsWith(`${language}:`)) {
                result.push(analyzer);
            }
        }
        return result;
    }
    static registerAnalyzer(analyzer) {
        const key = `${analyzer.language}:${analyzer.type}`;
        this.analyzers.set(key, analyzer);
    }
    static hasAnalyzer(language, type) {
        return this.analyzers.has(`${language}:${type}`);
    }
}
//# sourceMappingURL=AnalyzerFactory.js.map