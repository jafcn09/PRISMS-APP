import { PullRequest } from '../../domain/entities/PullRequest.js';
import { AnalysisResult } from '../../domain/entities/AnalysisResult.js';
import type { IAnalysisRepository } from '../../domain/repositories/IAnalysisRepository.js';
export declare class AnalyzePullRequestUseCase {
    private readonly analysisRepository;
    private readonly githubService;
    private cache;
    constructor(analysisRepository: IAnalysisRepository, githubService: IGitHubService);
    execute(pullRequest: PullRequest): Promise<AnalysisResult[]>;
    private analyzeFileWithCache;
    private analyzeFile;
    private calculateMaintainabilityIndex;
}
export interface IGitHubService {
    getFileContent(owner: string, repo: string, path: string, ref: string): Promise<string>;
    postComment(owner: string, repo: string, prNumber: number, body: string): Promise<void>;
    updateCheckRun(owner: string, repo: string, checkRunId: number, status: string, conclusion: string): Promise<void>;
}
//# sourceMappingURL=AnalyzePullRequest.d.ts.map