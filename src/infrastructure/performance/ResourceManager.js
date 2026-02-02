export class ResourceManager {
    static instance;
    memoryThreshold = 0.85;
    checkInterval = null;
    constructor() {
        this.startMonitoring();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new ResourceManager();
        }
        return this.instance;
    }
    startMonitoring() {
        this.checkInterval = setInterval(() => {
            this.checkMemoryUsage();
        }, 30000);
    }
    stopMonitoring() {
        if (this.checkInterval) {
            clearInterval(this.checkInterval);
            this.checkInterval = null;
        }
    }
    checkMemoryUsage() {
        const usage = process.memoryUsage();
        const heapUsedPercent = usage.heapUsed / usage.heapTotal;
        if (heapUsedPercent > this.memoryThreshold) {
            this.performGarbageCollection();
        }
    }
    performGarbageCollection() {
        if (global.gc) {
            global.gc();
            console.log('Manual garbage collection triggered');
        }
    }
    getMemoryStats() {
        const usage = process.memoryUsage();
        return {
            rss: this.formatBytes(usage.rss),
            heapTotal: this.formatBytes(usage.heapTotal),
            heapUsed: this.formatBytes(usage.heapUsed),
            external: this.formatBytes(usage.external),
            heapUsedPercent: `${((usage.heapUsed / usage.heapTotal) * 100).toFixed(2)}%`
        };
    }
    getSystemInfo() {
        return {
            platform: process.platform,
            arch: process.arch,
            nodeVersion: process.version,
            uptime: this.formatUptime(process.uptime()),
            cpus: require('os').cpus().length
        };
    }
    formatBytes(bytes) {
        const units = ['B', 'KB', 'MB', 'GB'];
        let size = bytes;
        let unitIndex = 0;
        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024;
            unitIndex++;
        }
        return `${size.toFixed(2)} ${units[unitIndex]}`;
    }
    formatUptime(seconds) {
        const days = Math.floor(seconds / 86400);
        const hours = Math.floor((seconds % 86400) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        const parts = [];
        if (days > 0)
            parts.push(`${days}d`);
        if (hours > 0)
            parts.push(`${hours}h`);
        if (minutes > 0)
            parts.push(`${minutes}m`);
        if (secs > 0 || parts.length === 0)
            parts.push(`${secs}s`);
        return parts.join(' ');
    }
    setMemoryThreshold(threshold) {
        if (threshold < 0.5 || threshold > 0.95) {
            throw new Error('Memory threshold must be between 0.5 and 0.95');
        }
        this.memoryThreshold = threshold;
    }
}
//# sourceMappingURL=ResourceManager.js.map