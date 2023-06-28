import { InputType } from '@nestjs/graphql';

@InputType()
export class MoveLaneInput {
  id: string;
  newPosition: number;
}
