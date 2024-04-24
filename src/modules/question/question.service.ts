import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Question } from './question.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';
import { AddQuestionDto } from 'src/dto/add-question.dto';
import { ModifyQuestionDto } from 'src/dto/modify-question.dto';
import { CategoryService } from '../category/category.service';

@Injectable()
export class QuestionService {
  constructor(
    private readonly categoryService: CategoryService,
    @InjectRepository(Question)
    private readonly questionRepository: EntityRepository<Question>,

    private readonly em: EntityManager,
  ) {}

  async GetAllQuestions() {
    return await this.questionRepository.findAll();
  }

  async GetQuestionsByCategory(category_id) {
    if (category_id == 0) {
      return await this.questionRepository.findAll();
    } else {
      return await this.questionRepository.find({ category_id: category_id });
    }
  }

  async GetQuestionById(id: string): Promise<Question> {
    const question = await this.questionRepository.findOne({ question_id: id });
    return question;
  }

  async AddQuestion(payload: AddQuestionDto) {
    const newId = uuidv4();
    const question = this.questionRepository.create({
      question_id: newId,
      ...payload,
    });

    this.em.persist(question);
    await this.em.flush();
    return question;
  }

  async ModifyQuestion(id: string, payload: ModifyQuestionDto) {
    const question_to_modify = await this.GetQuestionById(id);

    if (!question_to_modify) {
      throw new HttpException(
        'Entity could not be updated',
        HttpStatus.NOT_MODIFIED,
      );
    }

    Object.assign(question_to_modify, payload);
    this.em.persist(question_to_modify);
    await this.em.flush();
    return question_to_modify;
  }

  async DeleteQuestion(id) {
    let question_to_delete = await this.GetQuestionById(id);

    if (!question_to_delete) {
      throw new HttpException(
        'Entity could not be deleted',
        HttpStatus.NOT_MODIFIED,
      );
    }

    this.em.remove(question_to_delete);
    await this.em.flush();
    return question_to_delete;
  }

  getFileExtension(filename: string): string {
    const dotIndex = filename.lastIndexOf('.');
    
    if (dotIndex !== -1 && dotIndex < filename.length - 1) {
        return filename.substring(dotIndex).toLowerCase();
    } else {
        return "";
    }
  }

  async DeleteUnusedImages() {
    const path = require('path');
    const uploadsDir = path.resolve(__dirname, '../../..') + '\\uploads';
    let categoryPictureLinks = [];

    await this.categoryService.GetListOfCategories().then((response) => {
      categoryPictureLinks = response.map(function (element) {
        return element.category_picture_path;
      })
    });

    await this.GetAllQuestions().then((response) => {
      let pictureLinks = response.map(function (element) {
        return element.question_picture_path;
      });

      const allPictureLinks = pictureLinks.concat(categoryPictureLinks);

      const fs = require('fs');

      fs.readdir(uploadsDir, (err, files) => {
        files.forEach((file) => {
          if (!allPictureLinks.includes(file)) {
            fs.unlink(uploadsDir + '\\' + file, function () {});
          }
        });
      });
    });
  }
}
