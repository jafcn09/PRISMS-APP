import type { IAnalysisRepository } from '../../domain/repositories/IAnalysisRepository.js';
import type { AnalysisResult } from '../../domain/entities/AnalysisResult.js';
export declare class InMemoryAnalysisRepository implements IAnalysisRepository {
    private analyses;
    private analysesByPR;
    save(analysis: AnalysisResult): Promise<void>;
    findByPullRequestId(pullRequestId: string): Promise<AnalysisResult[]>;
    findById(id: string): Promise<AnalysisResult | null>;
    deleteByPullRequestId(pullRequestId: string): Promise<void>;
}
//# sourceMappingURL=InMemoryAnalysisRepository.d.ts.map