export declare class CacheManager {
    private static instance;
    private cache;
    private readonly maxSize;
    private readonly ttl;
    private constructor();
    static getInstance(): CacheManager;
    set<T>(key: string, data: T): void;
    get<T>(key: string): T | null;
    has(key: string): boolean;
    delete(key: string): void;
    clear(): void;
    getStats(): {
        size: number;
        maxSize: number;
        memoryUsage: number;
    };
    private isExpired;
    private evictLRU;
    private startCleanupInterval;
    private estimateMemoryUsage;
}
//# sourceMappingURL=CacheManager.d.ts.map