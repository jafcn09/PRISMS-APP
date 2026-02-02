import { ProgrammingLanguage } from '../../shared/types/languages.js';
import type { IParser } from '../../application/interfaces/IParser.js';
export declare class ParserFactory {
    private static parsers;
    static getParser(language: ProgrammingLanguage): IParser;
    private static registerParser;
    static hasParser(language: ProgrammingLanguage): boolean;
    static getAvailableLanguages(): ProgrammingLanguage[];
}
//# sourceMappingURL=ParserFactory.d.ts.map