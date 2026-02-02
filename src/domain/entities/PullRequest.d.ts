import { ProgrammingLanguage } from '../../shared/types/languages.js';
import { AnalysisResult } from './AnalysisResult.js';
import { FileChange } from '../valueObjects/FileChange.js';
export declare class PullRequest {
    private readonly _id;
    private readonly _number;
    private readonly _title;
    private readonly _description;
    private readonly _author;
    private readonly _repository;
    private readonly _baseBranch;
    private readonly _headBranch;
    private readonly _filesChanged;
    private readonly _additions;
    private readonly _deletions;
    private readonly _createdAt;
    private readonly _updatedAt;
    private _analysisResults;
    constructor(params: PullRequestParams);
    get id(): string;
    get number(): number;
    get title(): string;
    get description(): string | null;
    get author(): string;
    get repository(): Repository;
    get baseBranch(): string;
    get headBranch(): string;
    get filesChanged(): FileChange[];
    get additions(): number;
    get deletions(): number;
    get createdAt(): Date;
    get updatedAt(): Date;
    get analysisResults(): AnalysisResult[];
    /**
     * Add analysis result to the pull request
     */
    addAnalysisResult(result: AnalysisResult): void;
    /**
     * Get affected programming languages
     */
    getAffectedLanguages(): Set<ProgrammingLanguage>;
    /**
     * Calculate risk score based on changes
     */
    calculateRiskScore(): number;
    /**
     * Get files grouped by language
     */
    getFilesByLanguage(): Map<ProgrammingLanguage, FileChange[]>;
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
//# sourceMappingURL=PullRequest.d.ts.map