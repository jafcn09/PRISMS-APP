import dotenv from 'dotenv';

dotenv.config();

export class Environment {
  static readonly WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || 'prism_sups';
  static readonly GITHUB_APP_ID = process.env.GITHUB_APP_ID || '';
  static readonly PRIVATE_KEY_PATH = process.env.PRIVATE_KEY_PATH || './prism.pem';
  static readonly PORT = Number(process.env.PORT || 3000);
  static readonly NODE_ENV = process.env.NODE_ENV || 'development';
  static readonly LOG_LEVEL = process.env.LOG_LEVEL || 'info';
  static readonly MAX_FILE_SIZE = Number(process.env.MAX_FILE_SIZE || 1048576);
  static readonly ANALYSIS_TIMEOUT = Number(process.env.ANALYSIS_TIMEOUT || 30000);
  static readonly CACHE_TTL = Number(process.env.CACHE_TTL || 3600);

  static readonly ENABLE_SECURITY_ANALYSIS = process.env.ENABLE_SECURITY_ANALYSIS !== 'false';
  static readonly ENABLE_PERFORMANCE_ANALYSIS = process.env.ENABLE_PERFORMANCE_ANALYSIS !== 'false';
  static readonly ENABLE_COMPLEXITY_ANALYSIS = process.env.ENABLE_COMPLEXITY_ANALYSIS !== 'false';
  static readonly ENABLE_SEMANTIC_ANALYSIS = process.env.ENABLE_SEMANTIC_ANALYSIS !== 'false';

  static readonly MAX_REQUESTS_PER_MINUTE = Number(process.env.MAX_REQUESTS_PER_MINUTE || 60);
  static readonly MAX_CONCURRENT_ANALYSES = Number(process.env.MAX_CONCURRENT_ANALYSES || 5);

  static validate(): void {
    const required = ['GITHUB_APP_ID'];
    const missing = required.filter(key => !process.env[key]);

    if (missing.length > 0) {
      throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
  }
}