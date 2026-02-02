export declare class ResourceManager {
    private static instance;
    private memoryThreshold;
    private checkInterval;
    private constructor();
    static getInstance(): ResourceManager;
    private startMonitoring;
    stopMonitoring(): void;
    private checkMemoryUsage;
    private performGarbageCollection;
    getMemoryStats(): {
        rss: string;
        heapTotal: string;
        heapUsed: string;
        external: string;
        heapUsedPercent: string;
    };
    getSystemInfo(): {
        platform: string;
        arch: string;
        nodeVersion: string;
        uptime: string;
        cpus: number;
    };
    private formatBytes;
    private formatUptime;
    setMemoryThreshold(threshold: number): void;
}
//# sourceMappingURL=ResourceManager.d.ts.map