import fs from 'fs';
import path from 'path';
import { Environment } from '../config/Environment.js';
export class KeyManager {
    static cachedKey = null;
    static getPrivateKey() {
        if (this.cachedKey) {
            return this.cachedKey;
        }
        const keyPath = this.resolveKeyPath();
        this.validateKeyPath(keyPath);
        try {
            this.cachedKey = fs.readFileSync(keyPath, 'utf8');
            this.validateKeyContent(this.cachedKey);
            return this.cachedKey;
        }
        catch (error) {
            throw new Error(`Failed to read private key: ${error}`);
        }
    }
    static resolveKeyPath() {
        const configuredPath = Environment.PRIVATE_KEY_PATH;
        if (path.isAbsolute(configuredPath)) {
            return configuredPath;
        }
        return path.resolve(process.cwd(), configuredPath);
    }
    static validateKeyPath(keyPath) {
        if (!fs.existsSync(keyPath)) {
            throw new Error(`Private key file not found at: ${keyPath}`);
        }
        const stats = fs.statSync(keyPath);
        if (!stats.isFile()) {
            throw new Error(`Private key path is not a file: ${keyPath}`);
        }
        if (Environment.NODE_ENV === 'production') {
            const mode = (stats.mode & parseInt('777', 8)).toString(8);
            if (mode !== '600' && mode !== '400') {
                console.warn(`Warning: Private key file has insecure permissions: ${mode}. Should be 600 or 400.`);
            }
        }
    }
    static validateKeyContent(content) {
        if (!content.includes('-----BEGIN RSA PRIVATE KEY-----') &&
            !content.includes('-----BEGIN PRIVATE KEY-----')) {
            throw new Error('Invalid private key format');
        }
        if (content.length < 100) {
            throw new Error('Private key appears to be invalid or corrupted');
        }
    }
    static clearCache() {
        this.cachedKey = null;
    }
}
//# sourceMappingURL=KeyManager.js.map