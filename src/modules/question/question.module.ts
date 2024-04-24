import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { MulterModule } from '@nestjs/platform-express';
import { Question } from './question.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [
    MikroOrmModule.forFeature({ entities: [Question] }),
    MulterModule.register({ dest: './uploads' }),
    CategoryModule
  ],
  controllers: [QuestionController],
  providers: [QuestionService],
  exports: [QuestionService],
})
export class QuestionModule {}
