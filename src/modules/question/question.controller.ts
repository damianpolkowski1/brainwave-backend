import { Controller } from '@nestjs/common';
import { QuestionService } from './question.service';
import { Get, Patch, Delete, Post, Body } from '@nestjs/common';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  getSetOfQuestions() {
    return this.questionService.GetQuestion();
  }

  @Post()
  addQuestion(@Body() question) {
    return this.questionService.AddQuestion(question);
  }
}
