import { AnalysisResult } from '../entities/AnalysisResult.js';

export interface IAnalysisRepository {
  save(analysis: AnalysisResult): Promise<void>;
  findByPullRequestId(pullRequestId: string): Promise<AnalysisResult[]>;
  findById(id: string): Promise<AnalysisResult | null>;
  deleteByPullRequestId(pullRequestId: string): Promise<void>;
}