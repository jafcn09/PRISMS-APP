import { EventEmitter } from 'events';
import { Environment } from '../config/Environment.js';

interface QueueItem<T> {
  id: string;
  data: T;
  priority: number;
  timestamp: number;
  retries: number;
}

export class AnalysisQueue<T> extends EventEmitter {
  private queue: QueueItem<T>[] = [];
  private processing: Set<string> = new Set();
  private readonly maxConcurrent: number;
  private readonly maxRetries: number = 3;

  constructor() {
    super();
    this.maxConcurrent = Environment.MAX_CONCURRENT_ANALYSES;
  }

  async add(data: T, priority: number = 0): Promise<string> {
    const id = this.generateId();
    const item: QueueItem<T> = {
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

  async processNext(): Promise<void> {
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
    } catch (error) {
      this.handleError(item, error);
    } finally {
      this.processing.delete(item.id);
      setImmediate(() => this.processNext());
    }
  }

  private async processItem(item: QueueItem<T>): Promise<void> {
    this.emit('process', item.data);
  }

  private handleError(item: QueueItem<T>, error: any): void {
    item.retries++;

    if (item.retries < this.maxRetries) {
      item.priority = Math.max(0, item.priority - 1);
      this.queue.push(item);
      this.sortQueue();
      this.emit('retry', { item, error, attempt: item.retries });
    } else {
      this.emit('failed', { item, error });
    }
  }

  private sortQueue(): void {
    this.queue.sort((a, b) => {
      if (a.priority !== b.priority) {
        return b.priority - a.priority;
      }
      return a.timestamp - b.timestamp;
    });
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  getQueueLength(): number {
    return this.queue.length;
  }

  getProcessingCount(): number {
    return this.processing.size;
  }

  getStatus(): {
    queued: number;
    processing: number;
    maxConcurrent: number;
  } {
    return {
      queued: this.queue.length,
      processing: this.processing.size,
      maxConcurrent: this.maxConcurrent
    };
  }

  clear(): void {
    this.queue = [];
    this.emit('queue-cleared');
  }
}