import type { Request, Response, NextFunction } from 'express';
export declare class AuthMiddleware {
    static verifyWebhookSignature(req: Request, res: Response, next: NextFunction): void;
    static captureRawBody(req: Request, res: Response, buf: Buffer): void;
}
//# sourceMappingURL=AuthMiddleware.d.ts.map