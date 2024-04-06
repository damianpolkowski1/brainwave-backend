import { ScoreService } from './score.service';
import { Controller, Get, Post, Body, ValidationPipe } from '@nestjs/common';
import { CalculateScoreDto } from 'src/dto/calculate-score.dto';
import { PostScoreDto } from 'src/dto/post-score.dto';

@Controller('score')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Get('calculate')
  calculateScore(@Body(ValidationPipe) payload: CalculateScoreDto) {
    return this.scoreService.CalculateScore(payload.answer_array);
  }

  @Get('leaderboard')
  getLeaderboard() {
    return this.scoreService.GetLeaderboard();
  }

  @Post('post')
  postScore(@Body(ValidationPipe) score: PostScoreDto) {
    return this.scoreService.PostScore(score);
  }
}
