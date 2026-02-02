import { ProgrammingLanguage, LANGUAGE_EXTENSIONS } from '../../shared/types/languages.js';
import path from 'path';

export class FileChange {
  constructor(
    public readonly path: string,
    public readonly additions: number,
    public readonly deletions: number,
    public readonly status: FileStatus,
    public readonly patch?: string
  ) {}

  getLanguage(): ProgrammingLanguage | null {
    const ext = path.extname(this.path).toLowerCase();
    return LANGUAGE_EXTENSIONS[ext] || null;
  }

  getComplexity(): number {
    const totalChanges = this.additions + this.deletions;
    if (totalChanges > 100) return 3;
    if (totalChanges > 30) return 2;
    return 1;
  }

  isCriticalFile(): boolean {
    const criticalPatterns = [
      /package\.json$/,
      /\.env/,
      /config\//,
      /auth/,
      /security/
    ];
    return criticalPatterns.some(pattern => pattern.test(this.path));
  }
}

export enum FileStatus {
  ADDED = 'added',
  MODIFIED = 'modified',
  DELETED = 'deleted',
  RENAMED = 'renamed'
}