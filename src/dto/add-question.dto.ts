import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class AddQuestionDto {
  @IsNotEmpty()
  @IsNumber()
  category_id: number;

  @IsNotEmpty()
  @IsString()
  question_content: string;

  @IsNotEmpty()
  @IsString()
  correct_answer: string;

  @IsNotEmpty()
  @IsString()
  incorrect1: string;

  @IsNotEmpty()
  @IsString()
  incorrect2: string;

  @IsNotEmpty()
  @IsString()
  incorrect3: string;

  //   @IsNotEmpty()
  @IsString()
  question_picture_path: string;
}
