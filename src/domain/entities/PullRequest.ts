import { ProgrammingLanguage } from '../../shared/types/languages.js';
import { AnalysisResult } from './AnalysisResult.js';
import { FileChange } from '../valueObjects/FileChange.js';


export class PullRequest {
  private readonly _id: string;
  private readonly _number: number;
  private readonly _title: string;
  private readonly _description: string | null;
  private readonly _author: string;
  private readonly _repository: Repository;
  private readonly _baseBranch: string;
  private readonly _headBranch: string;
  private readonly _filesChanged: FileChange[];
  private readonly _additions: number;
  private readonly _deletions: number;
  private readonly _createdAt: Date;
  private readonly _updatedAt: Date;
  private _analysisResults: AnalysisResult[];

  constructor(params: PullRequestParams) {
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
  get id(): string { return this._id; }
  get number(): number { return this._number; }
  get title(): string { return this._title; }
  get description(): string | null { return this._description; }
  get author(): string { return this._author; }
  get repository(): Repository { return this._repository; }
  get baseBranch(): string { return this._baseBranch; }
  get headBranch(): string { return this._headBranch; }
  get filesChanged(): FileChange[] { return [...this._filesChanged]; }
  get additions(): number { return this._additions; }
  get deletions(): number { return this._deletions; }
  get createdAt(): Date { return this._createdAt; }
  get updatedAt(): Date { return this._updatedAt; }
  get analysisResults(): AnalysisResult[] { return [...this._analysisResults]; }

  /**
   * Add analysis result to the pull request
   */
  addAnalysisResult(result: AnalysisResult): void {
    this._analysisResults.push(result);
  }

  /**
   * Get affected programming languages
   */
  getAffectedLanguages(): Set<ProgrammingLanguage> {
    const languages = new Set<ProgrammingLanguage>();
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
  calculateRiskScore(): number {
    let score = 0;

    // Size-based risk
    const totalChanges = this._additions + this._deletions;
    if (totalChanges > 500) score += 30;
    else if (totalChanges > 200) score += 20;
    else if (totalChanges > 50) score += 10;

    // File count risk
    if (this._filesChanged.length > 20) score += 20;
    else if (this._filesChanged.length > 10) score += 10;
    else if (this._filesChanged.length > 5) score += 5;

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
  getFilesByLanguage(): Map<ProgrammingLanguage, FileChange[]> {
    const filesByLang = new Map<ProgrammingLanguage, FileChange[]>();

    for (const file of this._filesChanged) {
      const lang = file.getLanguage();
      if (lang) {
        if (!filesByLang.has(lang)) {
          filesByLang.set(lang, []);
        }
        filesByLang.get(lang)!.push(file);
      }
    }

    return filesByLang;
  }
}

/**
 * Repository information
 */
export interface Repository {
  name: string;
  owner: string;
  fullName: string;
  private: boolean;
  defaultBranch: string;
}

/**
 * Parameters for creating a PullRequest
 */
export interface PullRequestParams {
  id: string;
  number: number;
  title: string;
  description: string | null;
  author: string;
  repository: Repository;
  baseBranch: string;
  headBranch: string;
  filesChanged: FileChange[];
  additions: number;
  deletions: number;
  createdAt: Date;
  updatedAt: Date;
}