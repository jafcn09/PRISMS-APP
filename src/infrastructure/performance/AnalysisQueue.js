import { EventEmitter } from 'events';
import { Environment } from '../config/Environment.js';
export class AnalysisQueue extends EventEmitter {
    queue = [];
    processing = new Set();
    maxConcurrent;
    maxRetries = 3;
    constructor() {
        super();
        this.maxConcurrent = Environment.MAX_CONCURRENT_ANALYSES;
    }
    async add(data, priority = 0) {
        const id = this.generateId();
        const item = {
            id,
            data,
            priority,
            timestamp: Date.now(),
            retries: 0
        };
        this.queue.push(item);
        this.sortQueue();
        this.emit('item-added', item);
        setImmediate(() => this.processNext());
        return id;
    }
    async processNext() {
        if (this.processing.size >= this.maxConcurrent) {
            return;
        }
        const item = this.queue.shift();
        if (!item) {
            return;
        }
        this.processing.add(item.id);
        this.emit('processing-started', item);
        try {
            await this.processItem(item);
            this.emit('processing-completed', item);
        }
        catch (error) {
            this.handleError(item, error);
        }
        finally {
            this.processing.delete(item.id);
            setImmediate(() => this.processNext());
        }
    }
    async processItem(item) {
        this.emit('process', item.data);
    }
    handleError(item, error) {
        item.retries++;
        if (item.retries < this.maxRetries) {
            item.priority = Math.max(0, item.priority - 1);
            this.queue.push(item);
            this.sortQueue();
            this.emit('retry', { item, error, attempt: item.retries });
        }
        else {
            this.emit('failed', { item, error });
        }
    }
    sortQueue() {
        this.queue.sort((a, b) => {
            if (a.priority !== b.priority) {
                return b.priority - a.priority;
            }
            return a.timestamp - b.timestamp;
        });
    }
    generateId() {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
    getQueueLength() {
        return this.queue.length;
    }
    getProcessingCount() {
        return this.processing.size;
    }
    getStatus() {
        return {
            queued: this.queue.length,
            processing: this.processing.size,
            maxConcurrent: this.maxConcurrent
        };
    }
    clear() {
        this.queue = [];
        this.emit('queue-cleared');
    }
}
//# sourceMappingURL=AnalysisQueue.js.map