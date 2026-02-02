import type { IParser, AST, SyntaxValidation, CodeMetadata } from '../../../application/interfaces/IParser.js';
import { ProgrammingLanguage } from '../../../shared/types/languages.js';
import { parse } from '@babel/parser';

export class JavaScriptParser implements IParser {
  readonly language = ProgrammingLanguage.JAVASCRIPT;

  async parse(code: string): Promise<AST> {
    try {
      const ast = parse(code, {
        sourceType: 'module',
        plugins: ['jsx', 'flow', 'typescript'],
        errorRecovery: true
      });

      return {
        type: 'Program',
        body: [],
        comments: (ast.comments || []).map((c: any) => ({
          type: c.type === 'CommentBlock' ? 'Block' : 'Line',
          value: c.value,
          loc: c.loc
        })),
        tokens: []
      };
    } catch (error) {
      return {
        type: 'Program',
        body: [],
        comments: [],
        tokens: []
      };
    }
  }

  async validate(code: string): Promise<SyntaxValidation> {
    try {
      parse(code, {
        sourceType: 'module',
        plugins: ['jsx', 'flow'],
        errorRecovery: false
      });

      return {
        isValid: true,
        errors: [],
        warnings: []
      };
    } catch (error: any) {
      return {
        isValid: false,
        errors: [{
          message: error.message,
          line: error.loc?.line || 0,
          column: error.loc?.column || 0,
          severity: 'error'
        }],
        warnings: []
      };
    }
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