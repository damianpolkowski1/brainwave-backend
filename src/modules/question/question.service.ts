import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Question } from './question.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';
import { AddQuestionDto } from 'src/dto/add-question.dto';
import { ModifyQuestionDto } from 'src/dto/modify-question.dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: EntityRepository<Question>,

    private readonly em: EntityManager,
  ) {}

  async GetAllQuestions() {
    return this.AddRelativePathToArray(await this.questionRepository.findAll());
  }

  async GetSetOfQuestions(category_id) {
    return this.AddRelativePathToArray(
      await this.questionRepository.find({ category_id: category_id }),
    );
  }

  async GetQuestionById(id: string): Promise<Question> {
    const question = await this.questionRepository.findOne({ question_id: id });
    return this.AddRelativePathToSingleQuestion(question);
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

  AddRelativePathToArray(questions: Question[]) {
    const path = require('path');
    const projectDir = path.resolve(__dirname, '../../..');

    for (let i = 0; i < questions.length; i++) {
      questions[i].question_picture_path =
        projectDir + questions[i].question_picture_path;
    }
    return questions;
  }

  AddRelativePathToSingleQuestion(question: Question) {
    const path = require('path');
    const projectDir = path.resolve(__dirname, '../../..');

    question.question_picture_path =
      projectDir + question.question_picture_path;

    return question;
  }
}
