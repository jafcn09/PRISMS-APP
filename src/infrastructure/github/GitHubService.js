import { Octokit } from '@octokit/rest';
export class GitHubService {
    octokit;
    constructor(token) {
        this.octokit = new Octokit({ auth: token });
    }
    async getFileContent(owner, repo, path, ref) {
        try {
            const response = await this.octokit.repos.getContent({
                owner,
                repo,
                path,
                ref
            });
            if ('content' in response.data && response.data.content) {
                return Buffer.from(response.data.content, 'base64').toString('utf-8');
            }
            throw new Error('File content not available');
        }
        catch (error) {
            throw new Error(`Failed to fetch file content: ${error}`);
        }
    }
    async postComment(owner, repo, prNumber, body) {
        await this.octokit.issues.createComment({
            owner,
            repo,
            issue_number: prNumber,
            body
        });
    }
    async updateCheckRun(owner, repo, checkRunId, status, conclusion) {
        await this.octokit.checks.update({
            owner,
            repo,
            check_run_id: checkRunId,
            status: status,
            conclusion: conclusion
        });
    }
    async getFilesChanged(owner, repo, prNumber) {
        const response = await this.octokit.pulls.listFiles({
            owner,
            repo,
            pull_number: prNumber
        });
        return response.data;
    }
    async getPullRequest(owner, repo, prNumber) {
        const response = await this.octokit.pulls.get({
            owner,
            repo,
            pull_number: prNumber
        });
        return response.data;
    }
}
//# sourceMappingURL=GitHubService.js.map