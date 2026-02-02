import type { IParser, AST, SyntaxValidation, CodeMetadata, ASTNode, FunctionMetadata, ClassMetadata, VariableMetadata, SourceLocation } from '../../../application/interfaces/IParser.js';
import { ProgrammingLanguage } from '../../../shared/types/languages.js';
import * as ts from 'typescript';

export class TypeScriptParser implements IParser {
  readonly language = ProgrammingLanguage.TYPESCRIPT;

  async parse(code: string): Promise<AST> {
    const sourceFile = ts.createSourceFile(
      'temp.ts',
      code,
      ts.ScriptTarget.Latest,
      true
    );

    return {
      type: 'Program',
      body: this.parseNode(sourceFile).children || [],
      comments: this.extractComments(sourceFile),
      tokens: []
    };
  }

  async validate(code: string): Promise<SyntaxValidation> {
    const diagnostics = ts.transpileModule(code, {
      compilerOptions: {
        noEmit: true,
        allowJs: false,
        checkJs: false
      },
      reportDiagnostics: true
    }).diagnostics || [];

    return {
      isValid: diagnostics.length === 0,
      errors: diagnostics
        .filter(d => d.category === ts.DiagnosticCategory.Error)
        .map(d => ({
          message: ts.flattenDiagnosticMessageText(d.messageText, '\n'),
          line: d.start ? this.getLineNumber(code, d.start) : 0,
          column: d.start ? this.getColumnNumber(code, d.start) : 0,
          severity: 'error' as const
        })),
      warnings: diagnostics
        .filter(d => d.category === ts.DiagnosticCategory.Warning)
        .map(d => ({
          message: ts.flattenDiagnosticMessageText(d.messageText, '\n'),
          line: d.start ? this.getLineNumber(code, d.start) : 0,
          column: d.start ? this.getColumnNumber(code, d.start) : 0,
          severity: 'warning' as const
        }))
    };
  }

  extractMetadata(ast: AST): CodeMetadata {
    const metadata: CodeMetadata = {
      imports: [],
      exports: [],
      functions: [],
      classes: [],
      variables: [],
      dependencies: []
    };

    this.traverseAST(ast.body, metadata);
    return metadata;
  }

  private parseNode(node: ts.Node): ASTNode {
    const sourceFile = node.getSourceFile();
    const { line: startLine, character: startCol } = sourceFile.getLineAndCharacterOfPosition(node.getStart());
    const { line: endLine, character: endCol } = sourceFile.getLineAndCharacterOfPosition(node.getEnd());

    const astNode: ASTNode = {
      type: ts.SyntaxKind[node.kind],
      loc: {
        start: { line: startLine + 1, column: startCol },
        end: { line: endLine + 1, column: endCol }
      }
    };

    const children: ASTNode[] = [];
    node.forEachChild(child => {
      children.push(this.parseNode(child));
    });

    if (children.length > 0) {
      astNode.children = children;
    }

    return astNode;
  }

  private extractComments(sourceFile: ts.SourceFile): any[] {
    const comments: any[] = [];
    const text = sourceFile.getFullText();
    const commentRanges = ts.getLeadingCommentRanges(text, 0) || [];

    for (const range of commentRanges) {
      const commentText = text.substring(range.pos, range.end);
      const { line: startLine, character: startCol } = sourceFile.getLineAndCharacterOfPosition(range.pos);
      const { line: endLine, character: endCol } = sourceFile.getLineAndCharacterOfPosition(range.end);

      comments.push({
        type: range.kind === ts.SyntaxKind.SingleLineCommentTrivia ? 'Line' : 'Block',
        value: commentText,
        loc: {
          start: { line: startLine + 1, column: startCol },
          end: { line: endLine + 1, column: endCol }
        }
      });
    }

    return comments;
  }

  private traverseAST(nodes: ASTNode[], metadata: CodeMetadata): void {
    for (const node of nodes) {
      switch (node.type) {
        case 'FunctionDeclaration':
          metadata.functions.push(this.extractFunctionMetadata(node));
          break;
        case 'ClassDeclaration':
          metadata.classes.push(this.extractClassMetadata(node));
          break;
        case 'VariableStatement':
          metadata.variables.push(...this.extractVariableMetadata(node));
          break;
        case 'ImportDeclaration':
          metadata.imports.push(this.extractImportPath(node));
          break;
        case 'ExportDeclaration':
          metadata.exports.push(this.extractExportName(node));
          break;
      }

      if (node.children) {
        this.traverseAST(node.children, metadata);
      }
    }
  }

  private extractFunctionMetadata(node: ASTNode): FunctionMetadata {
    return {
      name: node.name || 'anonymous',
      parameters: [],
      isAsync: false,
      isExported: false,
      complexity: this.calculateComplexity(node),
      loc: node.loc
    };
  }

  private extractClassMetadata(node: ASTNode): ClassMetadata {
    return {
      name: node.name || 'anonymous',
      methods: [],
      properties: [],
      isExported: false,
      loc: node.loc
    };
  }

  private extractVariableMetadata(node: ASTNode): VariableMetadata[] {
    return [{
      name: 'variable',
      isConst: false,
      isExported: false,
      loc: node.loc
    }];
  }

  private extractImportPath(node: ASTNode): string {
    return 'import-path';
  }

  private extractExportName(node: ASTNode): string {
    return 'export-name';
  }

  private calculateComplexity(node: ASTNode): number {
    let complexity = 1;
    if (node.children) {
      for (const child of node.children) {
        if (child.type.includes('If') || child.type.includes('For') || child.type.includes('While')) {
          complexity++;
        }
        complexity += this.calculateComplexity(child) - 1;
      }
    }
    return complexity;
  }

  private getLineNumber(code: string, position: number): number {
    return code.substring(0, position).split('\n').length;
  }

  private getColumnNumber(code: string, position: number): number {
    const lines = code.substring(0, position).split('\n');
    return (lines[lines.length - 1]?.length) ?? 0;
  }
}