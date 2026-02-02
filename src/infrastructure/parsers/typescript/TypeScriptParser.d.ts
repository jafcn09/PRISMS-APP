import type { IParser, AST, SyntaxValidation, CodeMetadata } from '../../../application/interfaces/IParser.js';
import { ProgrammingLanguage } from '../../../shared/types/languages.js';
export declare class TypeScriptParser implements IParser {
    readonly language = ProgrammingLanguage.TYPESCRIPT;
    parse(code: string): Promise<AST>;
    validate(code: string): Promise<SyntaxValidation>;
    extractMetadata(ast: AST): CodeMetadata;
    private parseNode;
    private extractComments;
    private traverseAST;
    private extractFunctionMetadata;
    private extractClassMetadata;
    private extractVariableMetadata;
    private extractImportPath;
    private extractExportName;
    private calculateComplexity;
    private getLineNumber;
    private getColumnNumber;
}
//# sourceMappingURL=TypeScriptParser.d.ts.map