import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class PostScoreDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsNumber()
  score: number;
}
