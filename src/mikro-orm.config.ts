import { MySqlDriver, defineConfig } from '@mikro-orm/mysql';
import { Category } from './modules/category/category.entity';
import { Question } from './modules/question/question.entity';
import { Leaderboard } from './modules/score/score.entity';

export default defineConfig({
  host: 'localhost',
  port: 32841,
  user: 'root',
  password: 'root',
  entities: [Category, Question, Leaderboard],
  dbName: 'brainwave',
  driver: MySqlDriver,
});
