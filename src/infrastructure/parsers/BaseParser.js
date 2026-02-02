import { ProgrammingLanguage } from '../../shared/types/languages.js';
export class BaseParser {
    async parse(code) {
        return {
            type: 'Program',
            body: [],
            comments: [],
            tokens: []
        };
    }
    async validate(code) {
        return {
            isValid: true,
            errors: [],
            warnings: []
        };
    }
    extractMetadata(ast) {
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
//# sourceMappingURL=BaseParser.js.map