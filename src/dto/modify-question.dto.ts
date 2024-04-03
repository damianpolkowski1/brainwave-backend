import { PartialType } from '@nestjs/mapped-types';
import { AddQuestionDto } from './add-question.dto';

export class ModifyQuestionDto extends PartialType(AddQuestionDto) {}
