export class ResourceManager {
  private static instance: ResourceManager;
  private memoryThreshold: number = 0.85;
  private checkInterval: NodeJS.Timeout | null = null;

  private constructor() {
    this.startMonitoring();
  }

  static getInstance(): ResourceManager {
    if (!this.instance) {
      this.instance = new ResourceManager();
    }
    return this.instance;
  }

  private startMonitoring(): void {
    this.checkInterval = setInterval(() => {
      this.checkMemoryUsage();
    }, 30000);
  }

  stopMonitoring(): void {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
  }

  private checkMemoryUsage(): void {
    const usage = process.memoryUsage();
    const heapUsedPercent = usage.heapUsed / usage.heapTotal;

    if (heapUsedPercent > this.memoryThreshold) {
      this.performGarbageCollection();
    }
  }

  private performGarbageCollection(): void {
    if (global.gc) {
      global.gc();
      console.log('Manual garbage collection triggered');
    }
  }

  getMemoryStats(): {
    rss: string;
    heapTotal: string;
    heapUsed: string;
    external: string;
    heapUsedPercent: string;
  } {
    const usage = process.memoryUsage();
    return {
      rss: this.formatBytes(usage.rss),
      heapTotal: this.formatBytes(usage.heapTotal),
      heapUsed: this.formatBytes(usage.heapUsed),
      external: this.formatBytes(usage.external),
      heapUsedPercent: `${((usage.heapUsed / usage.heapTotal) * 100).toFixed(2)}%`
    };
  }

  getSystemInfo(): {
    platform: string;
    arch: string;
    nodeVersion: string;
    uptime: string;
    cpus: number;
  } {
    return {
      platform: process.platform,
      arch: process.arch,
      nodeVersion: process.version,
      uptime: this.formatUptime(process.uptime()),
      cpus: require('os').cpus().length
    };
  }

  private formatBytes(bytes: number): string {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    return `${size.toFixed(2)} ${units[unitIndex]}`;
  }

  private formatUptime(seconds: number): string {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    const parts = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (secs > 0 || parts.length === 0) parts.push(`${secs}s`);

    return parts.join(' ');
  }

  setMemoryThreshold(threshold: number): void {
    if (threshold < 0.5 || threshold > 0.95) {
      throw new Error('Memory threshold must be between 0.5 and 0.95');
    }
    this.memoryThreshold = threshold;
  }
}