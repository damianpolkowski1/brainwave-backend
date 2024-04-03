import { Entity, Property, PrimaryKey } from '@mikro-orm/core';

@Entity({ tableName: 'Leaderboard' })
export class Leaderboard {
  @PrimaryKey()
  score_id: number;

  @Property()
  username: string;

  @Property()
  score: number;
}
