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

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  getSetOfQuestions() {
    return this.questionService.GetAllQuestions();
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
