import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OpenaiService {
  private readonly logger = new Logger(OpenaiService.name);

  constructor(private readonly httpService: HttpService) {}

  async createEphemeralKey() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      this.logger.error('OpenAI API key is missing');
      throw new HttpException('OpenAI API key is missing', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    try {
      const response = await firstValueFrom(
        this.httpService.post('https://api.openai.com/v1/realtime/sessions', {
          model: 'gpt-4o-realtime-preview-2024-12-17',
          voice: 'verse',
        }, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }),
      );
      return response.data;
    } catch (error) {
      this.logger.error('Failed to create ephemeral key', error.response?.data || error.message);
      throw new HttpException('Failed to create ephemeral key', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
