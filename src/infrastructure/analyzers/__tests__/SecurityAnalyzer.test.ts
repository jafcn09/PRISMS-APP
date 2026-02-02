import { describe, it, expect } from 'vitest';
import { SecurityAnalyzer } from '../security/SecurityAnalyzer.js';
import { ProgrammingLanguage } from '../../../shared/types/languages.js';
import { IssueSeverity } from '../../../domain/entities/AnalysisResult.js';

describe('SecurityAnalyzer', () => {
  const analyzer = new SecurityAnalyzer(ProgrammingLanguage.JAVASCRIPT);
  const mockAST = { type: 'Program', body: [], comments: [], tokens: [] };
  const mockMetadata = {
    imports: [],
    exports: [],
    functions: [],
    classes: [],
    variables: [],
    dependencies: []
  };

  describe('hardcoded secrets detection', () => {
    it('should detect hardcoded API keys', async () => {
      const code = `const apiKey = "sk_live_1234567890abcdef";\nconst API_KEY = "my_secret_key_123";`;
      const result = await analyzer.analyze(mockAST, mockMetadata, code);

      const secretIssues = result.issues.filter(i => i.rule === 'no-hardcoded-secrets');
      expect(secretIssues.length).toBeGreaterThan(0);
      expect(secretIssues[0]?.severity).toBe(IssueSeverity.CRITICAL);
    });

    it('should detect hardcoded passwords', async () => {
      const code = `const password = "MyP@ssw0rd123";`;
      const result = await analyzer.analyze(mockAST, mockMetadata, code);

      const secretIssues = result.issues.filter(i => i.rule === 'no-hardcoded-secrets');
      expect(secretIssues.length).toBeGreaterThan(0);
    });

    it('should not flag environment variables', async () => {
      const code = `const apiKey = process.env.API_KEY;`;
      const result = await analyzer.analyze(mockAST, mockMetadata, code);

      const secretIssues = result.issues.filter(i => i.rule === 'no-hardcoded-secrets');
      expect(secretIssues.length).toBe(0);
    });
  });

  describe('insecure randomness detection', () => {
    it('should detect Math.random() usage', async () => {
      const code = `const token = Math.random().toString(36);`;
      const result = await analyzer.analyze(mockAST, mockMetadata, code);

      const randomIssues = result.issues.filter(i => i.rule === 'no-insecure-random');
      expect(randomIssues.length).toBeGreaterThan(0);
      expect(randomIssues[0]?.severity).toBe(IssueSeverity.MEDIUM);
    });
  });

  describe('SQL injection detection', () => {
    it('should detect string concatenation in SQL queries', async () => {
      const code = `const query = "SELECT * FROM users WHERE id = " + userId;`;
      const result = await analyzer.analyze(mockAST, mockMetadata, code);

      const sqlIssues = result.issues.filter(i => i.rule === 'no-sql-injection');
      expect(sqlIssues.length).toBeGreaterThan(0);
      expect(sqlIssues[0]?.severity).toBe(IssueSeverity.HIGH);
    });

    it('should detect template literals in SQL', async () => {
      const code = 'const query = `SELECT * FROM users WHERE id = ${userId}`;';
      const result = await analyzer.analyze(mockAST, mockMetadata, code);

      const sqlIssues = result.issues.filter(i => i.rule === 'no-sql-injection');
      expect(sqlIssues.length).toBeGreaterThan(0);
    });
  });

  describe('XSS detection', () => {
    it('should detect innerHTML usage', async () => {
      const code = `element.innerHTML = userInput;`;
      const result = await analyzer.analyze(mockAST, mockMetadata, code);

      const xssIssues = result.issues.filter(i => i.rule === 'no-unsafe-innerHTML');
      expect(xssIssues.length).toBeGreaterThan(0);
      expect(xssIssues[0]?.severity).toBe(IssueSeverity.HIGH);
    });

    it('should detect dangerouslySetInnerHTML', async () => {
      const code = `<div dangerouslySetInnerHTML={{__html: userInput}} />`;
      const result = await analyzer.analyze(mockAST, mockMetadata, code);

      const xssIssues = result.issues.filter(i => i.rule === 'no-unsafe-innerHTML');
      expect(xssIssues.length).toBeGreaterThan(0);
    });
  });

  describe('dangerous eval detection', () => {
    it('should detect eval() usage', async () => {
      const code = `eval(userCode);`;
      const result = await analyzer.analyze(mockAST, mockMetadata, code);

      const evalIssues = result.issues.filter(i => i.rule === 'no-eval');
      expect(evalIssues.length).toBeGreaterThan(0);
      expect(evalIssues[0]?.severity).toBe(IssueSeverity.CRITICAL);
    });

    it('should detect Function() constructor', async () => {
      const code = `const fn = new Function('return ' + userInput);`;
      const result = await analyzer.analyze(mockAST, mockMetadata, code);

      const evalIssues = result.issues.filter(i => i.rule === 'no-eval');
      expect(evalIssues.length).toBeGreaterThan(0);
    });
  });
});