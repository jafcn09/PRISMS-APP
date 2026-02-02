import { ProgrammingLanguage } from '../../shared/types/languages.js';
import { TypeScriptParser } from './typescript/TypeScriptParser.js';
import { JavaScriptParser } from './javascript/JavaScriptParser.js';
import { JavaParser } from './java/JavaParser.js';
import { GoParser } from './go/GoParser.js';
import { CSharpParser } from './csharp/CSharpParser.js';
import { RustParser } from './rust/RustParser.js';
import { DartParser } from './dart/DartParser.js';
import { PythonParser } from './python/PythonParser.js';
export class ParserFactory {
    static parsers = new Map();
    static {
        this.registerParser(new TypeScriptParser());
        this.registerParser(new JavaScriptParser());
        this.registerParser(new JavaParser());
        this.registerParser(new GoParser());
        this.registerParser(new CSharpParser());
        this.registerParser(new RustParser());
        this.registerParser(new DartParser());
        this.registerParser(new PythonParser());
    }
    static getParser(language) {
        const parser = this.parsers.get(language);
        if (!parser) {
            throw new Error(`No parser available for language: ${language}`);
        }
        return parser;
    }
    static registerParser(parser) {
        this.parsers.set(parser.language, parser);
    }
    static hasParser(language) {
        return this.parsers.has(language);
    }
    static getAvailableLanguages() {
        return Array.from(this.parsers.keys());
    }
}
//# sourceMappingURL=ParserFactory.js.map