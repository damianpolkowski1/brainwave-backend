import { IsString, IsNotEmpty, IsNumber, IsArray } from 'class-validator';

export interface QuestionAnswer {
  correct: boolean;
  time: number; //in ms
}

export class CalculateScoreDto {
  @IsNotEmpty()
  @IsArray()
  answer_array: QuestionAnswer[];
}
