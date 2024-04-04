import { QuestionService } from './question.service';
import {
  Controller,
  Get,
  Patch,
  Delete,
  Post,
  Body,
  ValidationPipe,
  Param,
} from '@nestjs/common';
import { AddQuestionDto } from 'src/dto/add-question.dto';
import { ModifyQuestionDto } from 'src/dto/modify-question.dto';
import { Question } from './question.entity';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  getAllQuestions() {
    return this.questionService.GetAllQuestions();
  }

  @Get('set/:id')
  async getSetOfQuestions(@Param('id') id: string) {
    const response = await this.questionService.GetSetOfQuestions(id);
    return this.extractSetOfQuestions(response);
  }

  extractSetOfQuestions(questions: Question[]) {
    const questionIds = this.generateUniqueRandomIntegers(10, questions.length);

    const randomQuestions: Question[] = [];

    for (let i = 0; i < questionIds.length; i++) {
      randomQuestions.push(questions[questionIds[i]]);
    }

    return randomQuestions;
  }

  generateUniqueRandomIntegers(count: number, bound: number): number[] {
    if (count > bound) return;

    const randomIntegers: number[] = [];

    while (randomIntegers.length < count) {
      const randomInt = Math.floor(Math.random() * bound);
      if (!randomIntegers.includes(randomInt)) {
        randomIntegers.push(randomInt);
      }
    }

    return randomIntegers;
  }

  @Get(':id')
  getQuestionById(@Param('id') id: string) {
    return this.questionService.GetQuestionById(id);
  }

  @Post()
  addQuestion(@Body(ValidationPipe) question: AddQuestionDto) {
    return this.questionService.AddQuestion(question);
  }

  @Patch(':id')
  modifyQuestion(
    @Param('id') id: string,
    @Body() modifiedQuestion: ModifyQuestionDto,
  ) {
    return this.questionService.ModifyQuestion(id, modifiedQuestion);
  }

  @Delete(':id')
  deleteQuestion(@Param('id') id: string) {
    return this.questionService.DeleteQuestion(id);
  }
}
