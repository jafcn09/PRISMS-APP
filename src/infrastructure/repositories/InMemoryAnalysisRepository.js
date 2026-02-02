export class InMemoryAnalysisRepository {
    analyses = new Map();
    analysesByPR = new Map();
    async save(analysis) {
        this.analyses.set(analysis.id, analysis);
        if (!this.analysesByPR.has(analysis.pullRequestId)) {
            this.analysesByPR.set(analysis.pullRequestId, new Set());
        }
        this.analysesByPR.get(analysis.pullRequestId).add(analysis.id);
    }
    async findByPullRequestId(pullRequestId) {
        const ids = this.analysesByPR.get(pullRequestId) || new Set();
        const results = [];
        for (const id of ids) {
            const analysis = this.analyses.get(id);
            if (analysis) {
                results.push(analysis);
            }
        }
        return results;
    }
    async findById(id) {
        return this.analyses.get(id) || null;
    }
    async deleteByPullRequestId(pullRequestId) {
        const ids = this.analysesByPR.get(pullRequestId) || new Set();
        for (const id of ids) {
            this.analyses.delete(id);
        }
        this.analysesByPR.delete(pullRequestId);
    }
}
//# sourceMappingURL=InMemoryAnalysisRepository.js.map