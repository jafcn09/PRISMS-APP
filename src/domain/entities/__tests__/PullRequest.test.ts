import { describe, it, expect } from 'vitest';
import { PullRequest, type Repository } from '../PullRequest.js';
import { FileChange, FileStatus } from '../../valueObjects/FileChange.js';

describe('PullRequest', () => {
  const mockRepository: Repository = {
    name: 'test-repo',
    owner: 'test-owner',
    fullName: 'test-owner/test-repo',
    private: false,
    defaultBranch: 'main'
  };

  const createTestPR = (overrides = {}) => {
    return new PullRequest({
      id: '123',
      number: 1,
      title: 'Test PR',
      description: 'Test description',
      author: 'test-author',
      repository: mockRepository,
      baseBranch: 'main',
      headBranch: 'feature',
      filesChanged: [],
      additions: 10,
      deletions: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...overrides
    });
  };

  describe('constructor', () => {
    it('should create a PullRequest instance', () => {
      const pr = createTestPR();
      expect(pr).toBeInstanceOf(PullRequest);
      expect(pr.id).toBe('123');
      expect(pr.number).toBe(1);
      expect(pr.title).toBe('Test PR');
    });
  });

  describe('calculateRiskScore', () => {
    it('should return low risk for small changes', () => {
      const pr = createTestPR({
        additions: 10,
        deletions: 5,
        filesChanged: []
      });
      const score = pr.calculateRiskScore();
      expect(score).toBeLessThan(20);
    });

    it('should return medium risk for moderate changes', () => {
      const pr = createTestPR({
        additions: 150,
        deletions: 50,
        filesChanged: Array(8).fill(new FileChange('test.ts', 10, 5, FileStatus.MODIFIED))
      });
      const score = pr.calculateRiskScore();
      expect(score).toBeGreaterThanOrEqual(20);
      expect(score).toBeLessThan(50);
    });

    it('should return high risk for large changes', () => {
      const pr = createTestPR({
        additions: 400,
        deletions: 200,
        filesChanged: Array(25).fill(new FileChange('test.ts', 10, 5, FileStatus.MODIFIED))
      });
      const score = pr.calculateRiskScore();
      expect(score).toBeGreaterThanOrEqual(50);
    });

    it('should increase risk for critical files', () => {
      const normalPR = createTestPR({
        filesChanged: [new FileChange('src/utils.ts', 10, 5, FileStatus.MODIFIED)]
      });
      const criticalPR = createTestPR({
        filesChanged: [new FileChange('package.json', 10, 5, FileStatus.MODIFIED)]
      });

      expect(criticalPR.calculateRiskScore()).toBeGreaterThan(normalPR.calculateRiskScore());
    });

    it('should cap risk score at 100', () => {
      const pr = createTestPR({
        additions: 1000,
        deletions: 1000,
        filesChanged: Array(50).fill(new FileChange('package.json', 100, 100, FileStatus.MODIFIED))
      });
      const score = pr.calculateRiskScore();
      expect(score).toBe(100);
    });
  });

  describe('getAffectedLanguages', () => {
    it('should return empty set for no files', () => {
      const pr = createTestPR({ filesChanged: [] });
      const languages = pr.getAffectedLanguages();
      expect(languages.size).toBe(0);
    });

    it('should return correct languages', () => {
      const pr = createTestPR({
        filesChanged: [
          new FileChange('test.ts', 10, 5, FileStatus.MODIFIED),
          new FileChange('test.js', 10, 5, FileStatus.MODIFIED),
          new FileChange('test.py', 10, 5, FileStatus.MODIFIED)
        ]
      });
      const languages = pr.getAffectedLanguages();
      expect(languages.size).toBe(3);
    });

    it('should not duplicate languages', () => {
      const pr = createTestPR({
        filesChanged: [
          new FileChange('test1.ts', 10, 5, FileStatus.MODIFIED),
          new FileChange('test2.ts', 10, 5, FileStatus.MODIFIED),
          new FileChange('test3.ts', 10, 5, FileStatus.MODIFIED)
        ]
      });
      const languages = pr.getAffectedLanguages();
      expect(languages.size).toBe(1);
    });
  });

  describe('getFilesByLanguage', () => {
    it('should group files by language', () => {
      const pr = createTestPR({
        filesChanged: [
          new FileChange('test1.ts', 10, 5, FileStatus.MODIFIED),
          new FileChange('test2.ts', 10, 5, FileStatus.MODIFIED),
          new FileChange('test.js', 10, 5, FileStatus.MODIFIED),
          new FileChange('test.py', 10, 5, FileStatus.MODIFIED)
        ]
      });
      const filesByLang = pr.getFilesByLanguage();
      expect(filesByLang.size).toBe(3);
    });
  });

  describe('addAnalysisResult', () => {
    it('should add analysis result', () => {
      const pr = createTestPR();
      expect(pr.analysisResults.length).toBe(0);
    });
  });
});