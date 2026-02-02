import { EventEmitter } from 'events';
export declare class AnalysisQueue<T> extends EventEmitter {
    private queue;
    private processing;
    private readonly maxConcurrent;
    private readonly maxRetries;
    constructor();
    add(data: T, priority?: number): Promise<string>;
    processNext(): Promise<void>;
    private processItem;
    private handleError;
    private sortQueue;
    private generateId;
    getQueueLength(): number;
    getProcessingCount(): number;
    getStatus(): {
        queued: number;
        processing: number;
        maxConcurrent: number;
    };
    clear(): void;
}
//# sourceMappingURL=AnalysisQueue.d.ts.map