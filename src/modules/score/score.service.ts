import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Leaderboard } from './score.entity';
import { EntityRepository, EntityManager } from '@mikro-orm/mysql';

@Injectable()
export class ScoreService {
  constructor(
    @InjectRepository(Leaderboard)
    private readonly scoreRepository: EntityRepository<Leaderboard>,

    private readonly em: EntityManager,
  ) {}
}
