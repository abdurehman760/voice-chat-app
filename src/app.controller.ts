import { Controller, Get, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { OpenaiService } from './openai/openai.service';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  private isGeneratingKey = false;

  constructor(private readonly openaiService: OpenaiService) {}

  @Get('session')
  async getSession() {
    if (this.isGeneratingKey) {
      throw new HttpException('Key generation in progress', HttpStatus.TOO_MANY_REQUESTS);
    }

    this.isGeneratingKey = true;
    try {
      const key = await this.openaiService.createEphemeralKey();
      this.logger.log(`Ephemeral key: ${JSON.stringify(key)}`);
      this.logger.log(`Ephemeral key client_secret: ${key.client_secret.value}`);
      return { client_secret: { value: key.client_secret.value } };
    } catch (error) {
      this.logger.error('Failed to get session', error);
      throw new HttpException('Failed to get session', HttpStatus.INTERNAL_SERVER_ERROR);
    } finally {
      this.isGeneratingKey = false;
    }
  }
}
