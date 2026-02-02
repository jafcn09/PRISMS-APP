import type { IParser, AST, SyntaxValidation, CodeMetadata } from '../../application/interfaces/IParser.js';
import { ProgrammingLanguage } from '../../shared/types/languages.js';
export declare abstract class BaseParser implements IParser {
    abstract readonly language: ProgrammingLanguage;
    parse(code: string): Promise<AST>;
    validate(code: string): Promise<SyntaxValidation>;
    extractMetadata(ast: AST): CodeMetadata;
}
//# sourceMappingURL=BaseParser.d.ts.map