import type { Request, Response } from 'express';
import type { IGitHubService } from '../../application/useCases/AnalyzePullRequest.js';
import type { IAnalysisRepository } from '../../domain/repositories/IAnalysisRepository.js';
export declare class WebhookController {
    private readonly githubService;
    private readonly analysisRepository;
    private analyzePRUseCase;
    private reportGenerator;
    constructor(githubService: IGitHubService, analysisRepository: IAnalysisRepository);
    handlePullRequest(req: Request, res: Response): Promise<void>;
    private mapToPullRequest;
    private mapFileStatus;
}
//# sourceMappingURL=WebhookController.d.ts.map