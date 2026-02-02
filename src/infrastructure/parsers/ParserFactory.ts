import { ProgrammingLanguage } from '../../shared/types/languages.js';
import type { IParser } from '../../application/interfaces/IParser.js';
import { TypeScriptParser } from './typescript/TypeScriptParser.js';
import { JavaScriptParser } from './javascript/JavaScriptParser.js';
import { JavaParser } from './java/JavaParser.js';
import { GoParser } from './go/GoParser.js';
import { CSharpParser } from './csharp/CSharpParser.js';
import { RustParser } from './rust/RustParser.js';
import { DartParser } from './dart/DartParser.js';
import { PythonParser } from './python/PythonParser.js';

export class ParserFactory {
  private static parsers = new Map<ProgrammingLanguage, IParser>();

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

  static getParser(language: ProgrammingLanguage): IParser {
    const parser = this.parsers.get(language);
    if (!parser) {
      throw new Error(`No parser available for language: ${language}`);
    }
    return parser;
  }

  private static registerParser(parser: IParser): void {
    this.parsers.set(parser.language, parser);
  }

  static hasParser(language: ProgrammingLanguage): boolean {
    return this.parsers.has(language);
  }

  static getAvailableLanguages(): ProgrammingLanguage[] {
    return Array.from(this.parsers.keys());
  }
}