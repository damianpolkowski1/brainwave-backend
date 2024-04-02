import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './modules/category/category.module';
import { QuestionModule } from './modules/question/question.module';
import { ScoreModule } from './modules/score/score.module';

@Module({
  imports: [CategoryModule, QuestionModule, ScoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
