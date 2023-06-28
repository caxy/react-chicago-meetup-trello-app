import { CreateLaneInput } from './create-lane.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateLaneInput extends PartialType(CreateLaneInput) {
  id: string;
}
