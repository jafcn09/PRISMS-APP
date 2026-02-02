import { BaseParser } from '../BaseParser.js';
import { ProgrammingLanguage } from '../../../shared/types/languages.js';

export class JavaParser extends BaseParser {
  readonly language = ProgrammingLanguage.JAVA;
}