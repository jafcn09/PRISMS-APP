import express from 'express';
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';
import { Octokit } from '@octokit/rest';
import { Environment } from './infrastructure/config/Environment.js';
import { KeyManager } from './infrastructure/security/KeyManager.js';
import { AuthMiddleware } from './infrastructure/middleware/AuthMiddleware.js';
import { WebhookController } from './presentation/controllers/WebhookController.js';
import { GitHubService } from './infrastructure/github/GitHubService.js';
import { InMemoryAnalysisRepository } from './infrastructure/repositories/InMemoryAnalysisRepository.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class App {
  private app: express.Application;
  private webhookController?: WebhookController;
  private analysisRepository: InMemoryAnalysisRepository;

  constructor() {
    this.app = express();
    this.analysisRepository = new InMemoryAnalysisRepository();
    this.setupMiddleware();
    this.setupRoutes();
  }

  private setupMiddleware(): void {
    const publicPath = path.join(__dirname, '../public');
    this.app.use(express.static(publicPath));

    this.app.use(
      express.json({
        verify: AuthMiddleware.captureRawBody
      })
    );
  }

  private setupRoutes(): void {
    this.app.get('/health', (_req, res) => {
      res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        environment: Environment.NODE_ENV
      });
    });

    this.app.post(
      '/webhook',
      AuthMiddleware.verifyWebhookSignature,
      async (req, res) => {
        const installationId = req.body?.installation?.id;
        if (!installationId) {
          res.status(400).send('Missing installation ID');
          return;
        }

        const token = await this.getInstallationToken(installationId);
        const githubService = new GitHubService(token);

        this.webhookController = new WebhookController(
          githubService,
          this.analysisRepository
        );

        await this.webhookController.handlePullRequest(req, res);
      }
    );

    this.app.get('/stats', async (_req, res) => {
      res.json({
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage(),
        version: '1.0.0'
      });
    });

    this.app.get('/', (_req, res) => {
      const indexPath = path.join(__dirname, '../public/index.html');
      res.sendFile(indexPath);
    });
  }

  private async getInstallationToken(installationId: number): Promise<string> {
    const appJwt = this.createAppJwt();
    const octokit = new Octokit({ auth: appJwt });

    const response = await octokit.request(
      'POST /app/installations/{installation_id}/access_tokens',
      { installation_id: installationId }
    );

    return response.data.token;
  }

  private createAppJwt(): string {
    const privateKey = KeyManager.getPrivateKey();
    const now = Math.floor(Date.now() / 1000);

    return jwt.sign(
      {
        iat: now - 10,
        exp: now + 9 * 60,
        iss: Environment.GITHUB_APP_ID
      },
      privateKey,
      { algorithm: 'RS256' }
    );
  }

  start(): void {
    Environment.validate();

    this.app.listen(Environment.PORT, () => {
      console.log(`PRISM Analysis Server running on port ${Environment.PORT}`);
      console.log(`Environment: ${Environment.NODE_ENV}`);
      console.log(`Log Level: ${Environment.LOG_LEVEL}`);
    });
  }
}