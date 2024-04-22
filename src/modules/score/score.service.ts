import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Leaderboard } from './score.entity';
import { EntityRepository, EntityManager } from '@mikro-orm/mysql';
import { QuestionAnswer } from 'src/dto/calculate-score.dto';
import { PostScoreDto } from 'src/dto/post-score.dto';
import { v4 as uuidv4 } from 'uuid';
import { Score } from './score.interface';

@Injectable()
export class ScoreService {
  constructor(
    @InjectRepository(Leaderboard)
    private readonly scoreRepository: EntityRepository<Leaderboard>,

    private readonly em: EntityManager,
  ) {}

  CalculateScore(answer_array: QuestionAnswer[]): Score {
    let sum = 0;
    let time_sum = 0;
    let correct = 0;
    let incorrect = 0;

    for (let i = 0; i < answer_array.length; i++) {
      const points_for_this_answer = this.CalculatePointsForSingleAnswer(
        answer_array[i],
      );
      time_sum += answer_array[i].time;

      if (points_for_this_answer === 0) {
        incorrect++;
      } else {
        correct++;
        sum += points_for_this_answer;
      }
    }
    return {
      score: sum,
      correct_answers: correct,
      incorrect_answers: incorrect,
      avg_answer_time: Math.floor(time_sum / answer_array.length),
    };
  }

  async GetLeaderboard() {
    const response = await this.em.findByCursor(
      Leaderboard,
      {},
      {
        first: 10,
        orderBy: { score: 'desc' },
      },
    );

    return response.items;
  }

  async GetLeaderboardByCategory(category_id: number) {
    const response = await this.em.findByCursor(
      Leaderboard,
      { category_id: category_id },
      {
        first: 10,
        orderBy: { score: 'desc' },
      },
    );

    return response.items;
  }

  async PostScore(payload: PostScoreDto) {
    const newId = uuidv4();
    const score = this.scoreRepository.create({
      score_id: newId,
      ...payload,
    });

    this.em.persist(score);
    await this.em.flush();
    return score;
  }

  async EmptyTable() {
    await this.em.nativeDelete(Leaderboard, {});
  }

  CalculatePointsForSingleAnswer(answer: QuestionAnswer) {
    if (answer.correct === false) {
      return 0;
    } else {
      if (answer.time <= 3000) {
        return 1000;
      } else {
        const amount_to_substract = Math.round((answer.time - 3000) / 40);

        if (1000 - amount_to_substract <= 0) {
          return 0;
        } else {
          return 1000 - amount_to_substract;
        }
      }
    }
  }
}
