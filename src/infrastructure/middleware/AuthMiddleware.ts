import type { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { Environment } from '../config/Environment.js';

export class AuthMiddleware {
  static verifyWebhookSignature(req: Request, res: Response, next: NextFunction): void {
    try {
      const signature = req.get('X-Hub-Signature-256') || '';
      const body = (req as any).rawBody;

      if (!signature || !body) {
        res.status(401).send('Missing signature or body');
        return;
      }

      const hmac = crypto.createHmac('sha256', Environment.WEBHOOK_SECRET);
      hmac.update(body);
      const expected = `sha256=${hmac.digest('hex')}`;

      const signatureBuffer = Buffer.from(signature);
      const expectedBuffer = Buffer.from(expected);

      if (signatureBuffer.length !== expectedBuffer.length) {
        res.status(401).send('Invalid signature');
        return;
      }

      if (!crypto.timingSafeEqual(signatureBuffer, expectedBuffer)) {
        res.status(401).send('Invalid signature');
        return;
      }

      next();
    } catch (error) {
      console.error('Signature verification error:', error);
      res.status(500).send('Internal server error');
    }
  }

  static captureRawBody(req: Request, res: Response, buf: Buffer): void {
    (req as any).rawBody = buf;
  }
}