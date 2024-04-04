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
    return this.AddRelativePathToArray(await this.categoryRepository.findAll());
  }

  AddRelativePathToArray(categories: Category[]) {
    const path = require('path');
    const projectDir = path.resolve(__dirname, '../../..');

    for (let i = 0; i < categories.length; i++) {
        categories[i].category_picture_path =
        projectDir + categories[i].category_picture_path;
    }
    return categories;
  }

  AddRelativePathToSingleQuestion(category: Category) {
    const path = require('path');
    const projectDir = path.resolve(__dirname, '../../..');

    category.category_picture_path =
      projectDir + category.category_picture_path;

    return category;
  }
}
