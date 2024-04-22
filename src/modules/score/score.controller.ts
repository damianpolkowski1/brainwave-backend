import { ScoreService } from './score.service';
import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  Param,
  Delete,
} from '@nestjs/common';
import { CalculateScoreDto } from 'src/dto/calculate-score.dto';
import { PostScoreDto } from 'src/dto/post-score.dto';

@Controller('score')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Post('calculate')
  calculateScore(@Body(ValidationPipe) payload: CalculateScoreDto) {
    return this.scoreService.CalculateScore(payload.answer_array);
  }

  @Get('leaderboard/:category_id')
  getLeaderboard(@Param('category_id') category_id: number) {
    if (category_id == 0) return this.scoreService.GetLeaderboard();
    else return this.scoreService.GetLeaderboardByCategory(category_id);
  }

  @Post('post')
  postScore(@Body(ValidationPipe) score: PostScoreDto) {
    return this.scoreService.PostScore(score);
  }

  @Delete('empty')
  emptyTable() {
    return this.scoreService.EmptyTable();
  }
}
