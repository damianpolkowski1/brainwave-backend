import { Entity, Property, OneToMany, PrimaryKey } from '@mikro-orm/core';

@Entity({ tableName: 'Category' })
export class Category {
  @PrimaryKey()
  category_id: number;

  @Property()
  category_name: string;

  @Property()
  category_picture_path: string;
}
