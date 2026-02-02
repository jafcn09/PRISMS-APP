import { ProgrammingLanguage, LANGUAGE_EXTENSIONS } from '../../shared/types/languages.js';
import path from 'path';
export class FileChange {
    path;
    additions;
    deletions;
    status;
    patch;
    constructor(path, additions, deletions, status, patch) {
        this.path = path;
        this.additions = additions;
        this.deletions = deletions;
        this.status = status;
        this.patch = patch;
    }
    getLanguage() {
        const ext = path.extname(this.path).toLowerCase();
        return LANGUAGE_EXTENSIONS[ext] || null;
    }
    getComplexity() {
        const totalChanges = this.additions + this.deletions;
        if (totalChanges > 100)
            return 3;
        if (totalChanges > 30)
            return 2;
        return 1;
    }
    isCriticalFile() {
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
export var FileStatus;
(function (FileStatus) {
    FileStatus["ADDED"] = "added";
    FileStatus["MODIFIED"] = "modified";
    FileStatus["DELETED"] = "deleted";
    FileStatus["RENAMED"] = "renamed";
})(FileStatus || (FileStatus = {}));
//# sourceMappingURL=FileChange.js.map