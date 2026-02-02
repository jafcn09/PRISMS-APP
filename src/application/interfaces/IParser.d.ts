import { ProgrammingLanguage } from '../../shared/types/languages.js';
export interface IParser {
    readonly language: ProgrammingLanguage;
    parse(code: string): Promise<AST>;
    validate(code: string): Promise<SyntaxValidation>;
    extractMetadata(ast: AST): CodeMetadata;
}
export interface AST {
    type: string;
    body: ASTNode[];
    comments: Comment[];
    tokens: Token[];
}
export interface ASTNode {
    type: string;
    loc: SourceLocation;
    children?: ASTNode[];
    value?: any;
    name?: string;
}
export interface SourceLocation {
    start: Position;
    end: Position;
}
export interface Position {
    line: number;
    column: number;
}
export interface Comment {
    type: 'Line' | 'Block';
    value: string;
    loc: SourceLocation;
}
export interface Token {
    type: string;
    value: string;
    loc: SourceLocation;
}
export interface SyntaxValidation {
    isValid: boolean;
    errors: SyntaxError[];
    warnings: SyntaxWarning[];
}
export interface SyntaxError {
    message: string;
    line: number;
    column: number;
    severity: 'error';
}
export interface SyntaxWarning {
    message: string;
    line: number;
    column: number;
    severity: 'warning';
}
export interface CodeMetadata {
    imports: string[];
    exports: string[];
    functions: FunctionMetadata[];
    classes: ClassMetadata[];
    variables: VariableMetadata[];
    dependencies: string[];
}
export interface FunctionMetadata {
    name: string;
    parameters: Parameter[];
    returnType?: string;
    isAsync: boolean;
    isExported: boolean;
    complexity: number;
    loc: SourceLocation;
}
export interface Parameter {
    name: string;
    type?: string;
    isOptional: boolean;
    defaultValue?: any;
}
export interface ClassMetadata {
    name: string;
    extends?: string;
    implements?: string[];
    methods: FunctionMetadata[];
    properties: PropertyMetadata[];
    isExported: boolean;
    loc: SourceLocation;
}
export interface PropertyMetadata {
    name: string;
    type?: string;
    visibility: 'public' | 'private' | 'protected';
    isStatic: boolean;
    isReadonly: boolean;
}
export interface VariableMetadata {
    name: string;
    type?: string;
    isConst: boolean;
    isExported: boolean;
    loc: SourceLocation;
}
//# sourceMappingURL=IParser.d.ts.map