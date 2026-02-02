import type { IParser, AST, SyntaxValidation, CodeMetadata } from '../../application/interfaces/IParser.js';
import { ProgrammingLanguage } from '../../shared/types/languages.js';

export abstract class BaseParser implements IParser {
  abstract readonly language: ProgrammingLanguage;

  async parse(code: string): Promise<AST> {
    return {
      type: 'Program',
      body: [],
      comments: [],
      tokens: []
    };
  }

  async validate(code: string): Promise<SyntaxValidation> {
    return {
      isValid: true,
      errors: [],
      warnings: []
    };
  }

  extractMetadata(ast: AST): CodeMetadata {
    return {
      imports: [],
      exports: [],
      functions: [],
      classes: [],
      variables: [],
      dependencies: []
    };
  }
}