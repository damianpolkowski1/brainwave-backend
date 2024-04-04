import { Module } from '@nestjs/common';
import { ScoreController } from './score.controller';
import { ScoreService } from './score.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MulterModule } from '@nestjs/platform-express';
import { Leaderboard } from './score.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature({ entities: [Leaderboard] }),
    MulterModule.register({ dest: './uploads' }),
  ],
  controllers: [ScoreController],
  providers: [ScoreService]
})
export class ScoreModule {}
