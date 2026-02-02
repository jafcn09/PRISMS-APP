import { BaseParser } from '../BaseParser.js';
import { ProgrammingLanguage } from '../../../shared/types/languages.js';

export class DartParser extends BaseParser {
  readonly language = ProgrammingLanguage.DART;
}