import type { IAnalysisRepository } from '../../domain/repositories/IAnalysisRepository.js';
import type { AnalysisResult } from '../../domain/entities/AnalysisResult.js';

export class InMemoryAnalysisRepository implements IAnalysisRepository {
  private analyses: Map<string, AnalysisResult> = new Map();
  private analysesByPR: Map<string, Set<string>> = new Map();

  async save(analysis: AnalysisResult): Promise<void> {
    this.analyses.set(analysis.id, analysis);

    if (!this.analysesByPR.has(analysis.pullRequestId)) {
      this.analysesByPR.set(analysis.pullRequestId, new Set());
    }
    this.analysesByPR.get(analysis.pullRequestId)!.add(analysis.id);
  }

  async findByPullRequestId(pullRequestId: string): Promise<AnalysisResult[]> {
    const ids = this.analysesByPR.get(pullRequestId) || new Set();
    const results: AnalysisResult[] = [];

    for (const id of ids) {
      const analysis = this.analyses.get(id);
      if (analysis) {
        results.push(analysis);
      }
    }

    return results;
  }

  async findById(id: string): Promise<AnalysisResult | null> {
    return this.analyses.get(id) || null;
  }

  async deleteByPullRequestId(pullRequestId: string): Promise<void> {
    const ids = this.analysesByPR.get(pullRequestId) || new Set();

    for (const id of ids) {
      this.analyses.delete(id);
    }

    this.analysesByPR.delete(pullRequestId);
  }
}