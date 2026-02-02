import type { IGitHubService } from '../../application/useCases/AnalyzePullRequest.js';
export declare class GitHubService implements IGitHubService {
    private octokit;
    constructor(token: string);
    getFileContent(owner: string, repo: string, path: string, ref: string): Promise<string>;
    postComment(owner: string, repo: string, prNumber: number, body: string): Promise<void>;
    updateCheckRun(owner: string, repo: string, checkRunId: number, status: string, conclusion: string): Promise<void>;
    getFilesChanged(owner: string, repo: string, prNumber: number): Promise<any[]>;
    getPullRequest(owner: string, repo: string, prNumber: number): Promise<any>;
}
//# sourceMappingURL=GitHubService.d.ts.map