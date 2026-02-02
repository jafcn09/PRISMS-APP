import { Octokit } from '@octokit/rest';
import type { IGitHubService } from '../../application/useCases/AnalyzePullRequest.js';

export class GitHubService implements IGitHubService {
  private octokit: Octokit;

  constructor(token: string) {
    this.octokit = new Octokit({ auth: token });
  }

  async getFileContent(owner: string, repo: string, path: string, ref: string): Promise<string> {
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
    } catch (error) {
      throw new Error(`Failed to fetch file content: ${error}`);
    }
  }

  async postComment(owner: string, repo: string, prNumber: number, body: string): Promise<void> {
    await this.octokit.issues.createComment({
      owner,
      repo,
      issue_number: prNumber,
      body
    });
  }

  async updateCheckRun(owner: string, repo: string, checkRunId: number, status: string, conclusion: string): Promise<void> {
    await this.octokit.checks.update({
      owner,
      repo,
      check_run_id: checkRunId,
      status: status as any,
      conclusion: conclusion as any
    });
  }

  async getFilesChanged(owner: string, repo: string, prNumber: number): Promise<any[]> {
    const response = await this.octokit.pulls.listFiles({
      owner,
      repo,
      pull_number: prNumber
    });

    return response.data;
  }

  async getPullRequest(owner: string, repo: string, prNumber: number): Promise<any> {
    const response = await this.octokit.pulls.get({
      owner,
      repo,
      pull_number: prNumber
    });

    return response.data;
  }
}