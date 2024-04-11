import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Category } from './category.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/core';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: EntityRepository<Category>,

    private readonly em: EntityManager,
  ) {}

  async GetListOfCategories() {
    return await this.categoryRepository.findAll();
  }
}
