import { Module } from '@nestjs/common';
import { OpenaiModule } from './openai/openai.module';
import { AppController } from './app.controller';

@Module({
  imports: [OpenaiModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
