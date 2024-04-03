import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './modules/category/category.module';
import { QuestionModule } from './modules/question/question.module';
import { ScoreModule } from './modules/score/score.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { CorsMiddleware } from './modules/question/question';
import config from './mikro-orm.config';

@Module({
  imports: [
    CategoryModule,
    QuestionModule,
    ScoreModule,
    MikroOrmModule.forRoot(config),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CorsMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
