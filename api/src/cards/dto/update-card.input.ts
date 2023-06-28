import { CreateCardInput } from './create-card.input';
import { InputType, OmitType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCardInput extends PartialType(OmitType(CreateCardInput, ['laneId'])) {
  id: string;
}
