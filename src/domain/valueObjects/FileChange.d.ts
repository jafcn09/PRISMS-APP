import { ProgrammingLanguage } from '../../shared/types/languages.js';
export declare class FileChange {
    readonly path: string;
    readonly additions: number;
    readonly deletions: number;
    readonly status: FileStatus;
    readonly patch?: string | undefined;
    constructor(path: string, additions: number, deletions: number, status: FileStatus, patch?: string | undefined);
    getLanguage(): ProgrammingLanguage | null;
    getComplexity(): number;
    isCriticalFile(): boolean;
}
export declare enum FileStatus {
    ADDED = "added",
    MODIFIED = "modified",
    DELETED = "deleted",
    RENAMED = "renamed"
}
//# sourceMappingURL=FileChange.d.ts.map