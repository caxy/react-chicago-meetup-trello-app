import { CreateCardInput } from './create-card.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCardInput extends PartialType(CreateCardInput) {
  id: string;
}
