import type { IParser, AST, SyntaxValidation, CodeMetadata } from '../../../application/interfaces/IParser.js';
import { ProgrammingLanguage } from '../../../shared/types/languages.js';
export declare class JavaScriptParser implements IParser {
    readonly language = ProgrammingLanguage.JAVASCRIPT;
    parse(code: string): Promise<AST>;
    validate(code: string): Promise<SyntaxValidation>;
    extractMetadata(ast: AST): CodeMetadata;
}
//# sourceMappingURL=JavaScriptParser.d.ts.map