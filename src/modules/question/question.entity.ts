import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Category } from '../category/category.entity';

@Entity({ tableName: 'Question' })
export class Question {
  @PrimaryKey({ type: 'uuid' })
  question_id: string;

  // @ManyToOne()
  // category_id: Category;
  @Property()
  category_id: number;

  @Property()
  question_content: string;

  @Property()
  correct_answer: string;

  @Property()
  incorrect1: string;

  @Property()
  incorrect2: string;

  @Property()
  incorrect3: string;

  @Property()
  question_picture_path: string;
}
