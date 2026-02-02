import { PullRequest } from '../../domain/entities/PullRequest.js';
import { AnalysisResult } from '../../domain/entities/AnalysisResult.js';
import type { IAnalysisRepository } from '../../domain/repositories/IAnalysisRepository.js';
import { ParserFactory } from '../../infrastructure/parsers/ParserFactory.js';
import { AnalyzerFactory } from '../../infrastructure/analyzers/AnalyzerFactory.js';
import { AnalyzerType } from '../interfaces/IAnalyzer.js';
import type { Issue, CodeMetrics } from '../../domain/entities/AnalysisResult.js';
import { CacheManager } from '../../infrastructure/performance/CacheManager.js';
import { Environment } from '../../infrastructure/config/Environment.js';

export class AnalyzePullRequestUseCase {
  private cache: CacheManager;

  constructor(
    private readonly analysisRepository: IAnalysisRepository,
    private readonly githubService: IGitHubService
  ) {
    this.cache = CacheManager.getInstance();
  }

  async execute(pullRequest: PullRequest): Promise<AnalysisResult[]> {
    const results: AnalysisResult[] = [];
    const filesByLanguage = pullRequest.getFilesByLanguage();
    const analysisPromises: Promise<AnalysisResult>[] = [];

    for (const [language, files] of filesByLanguage) {
      for (const file of files) {
        if (file.status === 'deleted') continue;

        const cacheKey = `analysis:${pullRequest.id}:${file.path}`;
        const cachedResult = this.cache.get<AnalysisResult>(cacheKey);

        if (cachedResult) {
          results.push(cachedResult);
          continue;
        }

        const promise = this.analyzeFileWithCache(
          pullRequest,
          language,
          file.path,
          cacheKey
        );

        analysisPromises.push(promise);
      }
    }

    const batchSize = Environment.MAX_CONCURRENT_ANALYSES;
    for (let i = 0; i < analysisPromises.length; i += batchSize) {
      const batch = analysisPromises.slice(i, i + batchSize);
      const batchResults = await Promise.all(batch);
      results.push(...batchResults);

      for (const result of batchResults) {
        await this.analysisRepository.save(result);
      }
    }

    return results;
  }

  private async analyzeFileWithCache(
    pullRequest: PullRequest,
    language: any,
    filePath: string,
    cacheKey: string
  ): Promise<AnalysisResult> {
    const content = await this.githubService.getFileContent(
      pullRequest.repository.owner,
      pullRequest.repository.name,
      filePath,
      pullRequest.headBranch
    );

    const result = await this.analyzeFile(
      pullRequest.id,
      language,
      filePath,
      content
    );

    this.cache.set(cacheKey, result);
    return result;
  }

  private async analyzeFile(
    pullRequestId: string,
    language: any,
    filePath: string,
    content: string
  ): Promise<AnalysisResult> {
    const parser = ParserFactory.getParser(language);
    const ast = await parser.parse(content);
    const metadata = parser.extractMetadata(ast);

    const analyzerTypes = [
      AnalyzerType.SEMANTIC,
      AnalyzerType.SECURITY,
      AnalyzerType.COMPLEXITY,
      AnalyzerType.PERFORMANCE
    ];

    const allIssues: Issue[] = [];
    const metricsData: Partial<CodeMetrics> = {};

    for (const type of analyzerTypes) {
      const analyzer = AnalyzerFactory.getAnalyzer(language, type);
      const output = await analyzer.analyze(ast, metadata, content);

      allIssues.push(...output.issues);
      Object.assign(metricsData, output.metrics);
    }

    const metrics: CodeMetrics = {
      linesOfCode: metricsData.linesOfCode || 0,
      cyclomaticComplexity: metricsData.cyclomaticComplexity || 0,
      cognitiveComplexity: metricsData.cognitiveComplexity || 0,
      maintainabilityIndex: this.calculateMaintainabilityIndex(metricsData),
      duplicatedLines: metricsData.duplicatedLines || 0,
      technicalDebt: metricsData.technicalDebt || 0
    };

    return new AnalysisResult(
      `${pullRequestId}-${filePath}-${Date.now()}`,
      pullRequestId,
      language,
      filePath,
      allIssues,
      metrics,
      new Date()
    );
  }

  private calculateMaintainabilityIndex(metrics: Partial<CodeMetrics>): number {
    const loc = metrics.linesOfCode || 0;
    const complexity = metrics.cyclomaticComplexity || 0;

    if (loc === 0) return 100;

    const mi = Math.max(
      0,
      (171 - 5.2 * Math.log(loc) - 0.23 * complexity) * 100 / 171
    );

    return Math.round(mi);
  }
}

export interface IGitHubService {
  getFileContent(owner: string, repo: string, path: string, ref: string): Promise<string>;
  postComment(owner: string, repo: string, prNumber: number, body: string): Promise<void>;
  updateCheckRun(owner: string, repo: string, checkRunId: number, status: string, conclusion: string): Promise<void>;
}