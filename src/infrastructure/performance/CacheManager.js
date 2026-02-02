import { Environment } from '../config/Environment.js';
export class CacheManager {
    static instance;
    cache;
    maxSize = 100;
    ttl;
    constructor() {
        this.cache = new Map();
        this.ttl = Environment.CACHE_TTL * 1000;
        this.startCleanupInterval();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CacheManager();
        }
        return this.instance;
    }
    set(key, data) {
        if (this.cache.size >= this.maxSize) {
            this.evictLRU();
        }
        this.cache.set(key, {
            data,
            timestamp: Date.now(),
            hits: 0
        });
    }
    get(key) {
        const entry = this.cache.get(key);
        if (!entry) {
            return null;
        }
        if (this.isExpired(entry)) {
            this.cache.delete(key);
            return null;
        }
        entry.hits++;
        return entry.data;
    }
    has(key) {
        const entry = this.cache.get(key);
        if (!entry)
            return false;
        if (this.isExpired(entry)) {
            this.cache.delete(key);
            return false;
        }
        return true;
    }
    delete(key) {
        this.cache.delete(key);
    }
    clear() {
        this.cache.clear();
    }
    getStats() {
        return {
            size: this.cache.size,
            maxSize: this.maxSize,
            memoryUsage: this.estimateMemoryUsage()
        };
    }
    isExpired(entry) {
        return Date.now() - entry.timestamp > this.ttl;
    }
    evictLRU() {
        let lruKey = null;
        let minHits = Infinity;
        let oldestTime = Date.now();
        for (const [key, entry] of this.cache.entries()) {
            const score = entry.hits + (Date.now() - entry.timestamp) / this.ttl;
            if (score < minHits) {
                minHits = score;
                lruKey = key;
            }
        }
        if (lruKey) {
            this.cache.delete(lruKey);
        }
    }
    startCleanupInterval() {
        setInterval(() => {
            for (const [key, entry] of this.cache.entries()) {
                if (this.isExpired(entry)) {
                    this.cache.delete(key);
                }
            }
        }, 60000);
    }
    estimateMemoryUsage() {
        let size = 0;
        for (const entry of this.cache.values()) {
            size += JSON.stringify(entry.data).length * 2;
        }
        return size;
    }
}
//# sourceMappingURL=CacheManager.js.map