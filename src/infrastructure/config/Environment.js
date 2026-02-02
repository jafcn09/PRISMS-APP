import dotenv from 'dotenv';
dotenv.config();
export class Environment {
    static WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || 'prism_sups';
    static GITHUB_APP_ID = process.env.GITHUB_APP_ID || '';
    static PRIVATE_KEY_PATH = process.env.PRIVATE_KEY_PATH || './prism.pem';
    static PORT = Number(process.env.PORT || 3000);
    static NODE_ENV = process.env.NODE_ENV || 'development';
    static LOG_LEVEL = process.env.LOG_LEVEL || 'info';
    static MAX_FILE_SIZE = Number(process.env.MAX_FILE_SIZE || 1048576);
    static ANALYSIS_TIMEOUT = Number(process.env.ANALYSIS_TIMEOUT || 30000);
    static CACHE_TTL = Number(process.env.CACHE_TTL || 3600);
    static ENABLE_SECURITY_ANALYSIS = process.env.ENABLE_SECURITY_ANALYSIS !== 'false';
    static ENABLE_PERFORMANCE_ANALYSIS = process.env.ENABLE_PERFORMANCE_ANALYSIS !== 'false';
    static ENABLE_COMPLEXITY_ANALYSIS = process.env.ENABLE_COMPLEXITY_ANALYSIS !== 'false';
    static ENABLE_SEMANTIC_ANALYSIS = process.env.ENABLE_SEMANTIC_ANALYSIS !== 'false';
    static MAX_REQUESTS_PER_MINUTE = Number(process.env.MAX_REQUESTS_PER_MINUTE || 60);
    static MAX_CONCURRENT_ANALYSES = Number(process.env.MAX_CONCURRENT_ANALYSES || 5);
    static validate() {
        const required = ['GITHUB_APP_ID'];
        const missing = required.filter(key => !process.env[key]);
        if (missing.length > 0) {
            throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
        }
    }
}
//# sourceMappingURL=Environment.js.map