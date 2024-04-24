import { QuestionService } from './question.service';
import {
  Controller,
  Get,
  Delete,
  Post,
  Body,
  ValidationPipe,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AddQuestionDto } from 'src/dto/add-question.dto';
import { Question } from './question.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get('all')
  getAllQuestions() {
    return this.questionService.GetAllQuestions();
  }

  @Get('category/:id')
  async getQuestionsByCategory(@Param('id') id: string) {
    return await this.questionService.GetQuestionsByCategory(id);
  }

  @Get('set/:id')
  async getSetOfQuestions(@Param('id') id: string) {
    const response = await this.questionService.GetQuestionsByCategory(id);
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

  @Post('add')
  @UseInterceptors(
    FileInterceptor('question_picture_path', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const newId = uuidv4();
          let extension = '';
          const dotIndex = file.originalname.lastIndexOf('.');

          if (dotIndex !== -1 && dotIndex < file.originalname.length - 1) {
            extension = file.originalname.substring(dotIndex).toLowerCase();
          } else {
            extension = '.png';
          }
          const filename = newId + extension;
          callback(null, filename);
        },
      }),
    }),
  )
  async addQuestion(
    @Body() newQuestion,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const response = await this.questionService.AddQuestion({
      question_picture_path: file.filename,
      ...newQuestion,
    });

    return response;
  }

  @Post('modify/:id')
  @UseInterceptors(
    FileInterceptor('question_picture_path', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const newId = uuidv4();
          let extension = '';
          const dotIndex = file.originalname.lastIndexOf('.');

          if (dotIndex !== -1 && dotIndex < file.originalname.length - 1) {
            extension = file.originalname.substring(dotIndex).toLowerCase();
          } else {
            extension = '.png';
          }
          const filename = newId + extension;
          callback(null, filename);
        },
      }),
    }),
  )
  async modifyQuestion(
    @Param('id') id: string,
    @Body() updatedQuestion,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      const response = await this.questionService
        .ModifyQuestion(id, {
          question_picture_path: file.filename,
          ...updatedQuestion,
        })
        .then(() => {
          this.questionService.DeleteUnusedImages();
        });

      return response;
    } else {
      const response = await this.questionService
        .ModifyQuestion(id, {
          ...updatedQuestion,
        })
        .then(() => {
          this.questionService.DeleteUnusedImages();
        });

      return response;
    }
  }

  @Delete('delete/:id')
  async deleteQuestion(@Param('id') id: string) {
    const response = await this.questionService.DeleteQuestion(id).then(() => {
      this.questionService.DeleteUnusedImages();
    });

    return response;
  }
}
