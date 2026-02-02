import { BaseParser } from '../BaseParser.js';
import { ProgrammingLanguage } from '../../../shared/types/languages.js';

export class GoParser extends BaseParser {
  readonly language = ProgrammingLanguage.GO;
}