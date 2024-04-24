import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'Question' })
export class Question {
  @PrimaryKey({ type: 'uuid' })
  question_id: string;

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
