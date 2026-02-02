import { PullRequest } from '../../domain/entities/PullRequest.js';
import { FileChange, FileStatus } from '../../domain/valueObjects/FileChange.js';
import { AnalyzePullRequestUseCase } from '../../application/useCases/AnalyzePullRequest.js';
import { ReportGenerator } from '../../application/services/ReportGenerator.js';
export class WebhookController {
    githubService;
    analysisRepository;
    analyzePRUseCase;
    reportGenerator;
    constructor(githubService, analysisRepository) {
        this.githubService = githubService;
        this.analysisRepository = analysisRepository;
        this.analyzePRUseCase = new AnalyzePullRequestUseCase(analysisRepository, githubService);
        this.reportGenerator = new ReportGenerator();
    }
    async handlePullRequest(req, res) {
        try {
            const event = req.get('X-GitHub-Event');
            if (event !== 'pull_request') {
                res.status(200).send('Event ignored');
                return;
            }
            const action = req.body?.action;
            if (!['opened', 'reopened', 'synchronize'].includes(action)) {
                res.status(200).send('Action ignored');
                return;
            }
            const pullRequest = this.mapToPullRequest(req.body);
            const results = await this.analyzePRUseCase.execute(pullRequest);
            const report = this.reportGenerator.generateMarkdownReport(pullRequest, results);
            await this.githubService.postComment(pullRequest.repository.owner, pullRequest.repository.name, pullRequest.number, report);
            res.status(200).send('Analysis complete');
        }
        catch (error) {
            console.error('Webhook processing error:', error);
            res.status(500).send('Internal server error');
        }
    }
    mapToPullRequest(payload) {
        const pr = payload.pull_request;
        const repo = payload.repository;
        const repository = {
            name: repo.name,
            owner: repo.owner.login,
            fullName: repo.full_name,
            private: repo.private,
            defaultBranch: repo.default_branch
        };
        const filesChanged = [];
        if (payload.pull_request.files) {
            for (const file of payload.pull_request.files) {
                filesChanged.push(new FileChange(file.filename, file.additions, file.deletions, this.mapFileStatus(file.status), file.patch));
            }
        }
        return new PullRequest({
            id: pr.id.toString(),
            number: pr.number,
            title: pr.title,
            description: pr.body,
            author: pr.user.login,
            repository: repository,
            baseBranch: pr.base.ref,
            headBranch: pr.head.ref,
            filesChanged: filesChanged,
            additions: pr.additions,
            deletions: pr.deletions,
            createdAt: new Date(pr.created_at),
            updatedAt: new Date(pr.updated_at)
        });
    }
    mapFileStatus(status) {
        switch (status) {
            case 'added': return FileStatus.ADDED;
            case 'removed': return FileStatus.DELETED;
            case 'renamed': return FileStatus.RENAMED;
            default: return FileStatus.MODIFIED;
        }
    }
}
//# sourceMappingURL=WebhookController.js.map