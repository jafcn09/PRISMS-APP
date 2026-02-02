import { BaseParser } from '../BaseParser.js';
import { ProgrammingLanguage } from '../../../shared/types/languages.js';

export class RustParser extends BaseParser {
  readonly language = ProgrammingLanguage.RUST;
}