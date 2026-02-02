import { BaseParser } from '../BaseParser.js';
import { ProgrammingLanguage } from '../../../shared/types/languages.js';

export class PythonParser extends BaseParser {
  readonly language = ProgrammingLanguage.PYTHON;
}