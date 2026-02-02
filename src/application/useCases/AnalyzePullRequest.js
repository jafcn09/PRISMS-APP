import { PullRequest } from '../../domain/entities/PullRequest.js';
import { AnalysisResult } from '../../domain/entities/AnalysisResult.js';
import { ParserFactory } from '../../infrastructure/parsers/ParserFactory.js';
import { AnalyzerFactory } from '../../infrastructure/analyzers/AnalyzerFactory.js';
import { AnalyzerType } from '../interfaces/IAnalyzer.js';
import { CacheManager } from '../../infrastructure/performance/CacheManager.js';
import { Environment } from '../../infrastructure/config/Environment.js';
export class AnalyzePullRequestUseCase {
    analysisRepository;
    githubService;
    cache;
    constructor(analysisRepository, githubService) {
        this.analysisRepository = analysisRepository;
        this.githubService = githubService;
        this.cache = CacheManager.getInstance();
    }
    async execute(pullRequest) {
        const results = [];
        const filesByLanguage = pullRequest.getFilesByLanguage();
        const analysisPromises = [];
        for (const [language, files] of filesByLanguage) {
            for (const file of files) {
                if (file.status === 'deleted')
                    continue;
                const cacheKey = `analysis:${pullRequest.id}:${file.path}`;
                const cachedResult = this.cache.get(cacheKey);
                if (cachedResult) {
                    results.push(cachedResult);
                    continue;
                }
                const promise = this.analyzeFileWithCache(pullRequest, language, file.path, cacheKey);
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
    async analyzeFileWithCache(pullRequest, language, filePath, cacheKey) {
        const content = await this.githubService.getFileContent(pullRequest.repository.owner, pullRequest.repository.name, filePath, pullRequest.headBranch);
        const result = await this.analyzeFile(pullRequest.id, language, filePath, content);
        this.cache.set(cacheKey, result);
        return result;
    }
    async analyzeFile(pullRequestId, language, filePath, content) {
        const parser = ParserFactory.getParser(language);
        const ast = await parser.parse(content);
        const metadata = parser.extractMetadata(ast);
        const analyzerTypes = [
            AnalyzerType.SEMANTIC,
            AnalyzerType.SECURITY,
            AnalyzerType.COMPLEXITY,
            AnalyzerType.PERFORMANCE
        ];
        const allIssues = [];
        const metricsData = {};
        for (const type of analyzerTypes) {
            const analyzer = AnalyzerFactory.getAnalyzer(language, type);
            const output = await analyzer.analyze(ast, metadata, content);
            allIssues.push(...output.issues);
            Object.assign(metricsData, output.metrics);
        }
        const metrics = {
            linesOfCode: metricsData.linesOfCode || 0,
            cyclomaticComplexity: metricsData.cyclomaticComplexity || 0,
            cognitiveComplexity: metricsData.cognitiveComplexity || 0,
            maintainabilityIndex: this.calculateMaintainabilityIndex(metricsData),
            duplicatedLines: metricsData.duplicatedLines || 0,
            technicalDebt: metricsData.technicalDebt || 0
        };
        return new AnalysisResult(`${pullRequestId}-${filePath}-${Date.now()}`, pullRequestId, language, filePath, allIssues, metrics, new Date());
    }
    calculateMaintainabilityIndex(metrics) {
        const loc = metrics.linesOfCode || 0;
        const complexity = metrics.cyclomaticComplexity || 0;
        if (loc === 0)
            return 100;
        const mi = Math.max(0, (171 - 5.2 * Math.log(loc) - 0.23 * complexity) * 100 / 171);
        return Math.round(mi);
    }
}
//# sourceMappingURL=AnalyzePullRequest.js.map