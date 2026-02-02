import { ProgrammingLanguage } from '../../shared/types/languages.js';
import { AnalysisResult } from './AnalysisResult.js';
import { FileChange } from '../valueObjects/FileChange.js';
export class PullRequest {
    _id;
    _number;
    _title;
    _description;
    _author;
    _repository;
    _baseBranch;
    _headBranch;
    _filesChanged;
    _additions;
    _deletions;
    _createdAt;
    _updatedAt;
    _analysisResults;
    constructor(params) {
        this._id = params.id;
        this._number = params.number;
        this._title = params.title;
        this._description = params.description;
        this._author = params.author;
        this._repository = params.repository;
        this._baseBranch = params.baseBranch;
        this._headBranch = params.headBranch;
        this._filesChanged = params.filesChanged;
        this._additions = params.additions;
        this._deletions = params.deletions;
        this._createdAt = params.createdAt;
        this._updatedAt = params.updatedAt;
        this._analysisResults = [];
    }
    // Getters
    get id() { return this._id; }
    get number() { return this._number; }
    get title() { return this._title; }
    get description() { return this._description; }
    get author() { return this._author; }
    get repository() { return this._repository; }
    get baseBranch() { return this._baseBranch; }
    get headBranch() { return this._headBranch; }
    get filesChanged() { return [...this._filesChanged]; }
    get additions() { return this._additions; }
    get deletions() { return this._deletions; }
    get createdAt() { return this._createdAt; }
    get updatedAt() { return this._updatedAt; }
    get analysisResults() { return [...this._analysisResults]; }
    /**
     * Add analysis result to the pull request
     */
    addAnalysisResult(result) {
        this._analysisResults.push(result);
    }
    /**
     * Get affected programming languages
     */
    getAffectedLanguages() {
        const languages = new Set();
        for (const file of this._filesChanged) {
            const lang = file.getLanguage();
            if (lang) {
                languages.add(lang);
            }
        }
        return languages;
    }
    /**
     * Calculate risk score based on changes
     */
    calculateRiskScore() {
        let score = 0;
        // Size-based risk
        const totalChanges = this._additions + this._deletions;
        if (totalChanges > 500)
            score += 30;
        else if (totalChanges > 200)
            score += 20;
        else if (totalChanges > 50)
            score += 10;
        // File count risk
        if (this._filesChanged.length > 20)
            score += 20;
        else if (this._filesChanged.length > 10)
            score += 10;
        else if (this._filesChanged.length > 5)
            score += 5;
        // Critical file risk
        const criticalPatterns = [
            /package\.json$/,
            /yarn\.lock$/,
            /pom\.xml$/,
            /go\.mod$/,
            /Cargo\.toml$/,
            /\.env/,
            /config\//,
            /auth\//,
            /security\//
        ];
        for (const file of this._filesChanged) {
            if (criticalPatterns.some(pattern => pattern.test(file.path))) {
                score += 15;
                break;
            }
        }
        return Math.min(100, score); // Cap at 100
    }
    /**
     * Get files grouped by language
     */
    getFilesByLanguage() {
        const filesByLang = new Map();
        for (const file of this._filesChanged) {
            const lang = file.getLanguage();
            if (lang) {
                if (!filesByLang.has(lang)) {
                    filesByLang.set(lang, []);
                }
                filesByLang.get(lang).push(file);
            }
        }
        return filesByLang;
    }
}
//# sourceMappingURL=PullRequest.js.map