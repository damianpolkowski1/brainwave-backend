import { Injectable } from '@nestjs/common';
import { Question } from './question.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: EntityRepository<Question>,

    private readonly em: EntityManager,
  ) {}

  async GetQuestion() {
    return this.questionRepository.findAll();
  }

  async AddQuestion(payload) {
    const newId = uuidv4();
    const question = this.questionRepository.create({ question_id: newId, ...payload });

    this.em.persist(question);
    await this.em.flush();
    return question;
  }
}
