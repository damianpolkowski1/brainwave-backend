import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Leaderboard } from './score.entity';
import { EntityRepository, EntityManager } from '@mikro-orm/mysql';
import { QuestionAnswer } from 'src/dto/calculate-score.dto';
import { PostScoreDto } from 'src/dto/post-score.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ScoreService {
  constructor(
    @InjectRepository(Leaderboard)
    private readonly scoreRepository: EntityRepository<Leaderboard>,

    private readonly em: EntityManager,
  ) {}

  CalculateScore(answer_array: QuestionAnswer[]) {
    let sum = 0;
    for (let i = 0; i < answer_array.length; i++) {
      sum += this.CalculatePointsForSingleAnswer(answer_array[i]);
    }

    return sum;
  }

  async GetLeaderboard() {
    return await this.em.findByCursor(
      Leaderboard,
      {},
      {
        first: 10,
        orderBy: { score: 'desc' },
      },
    );
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
