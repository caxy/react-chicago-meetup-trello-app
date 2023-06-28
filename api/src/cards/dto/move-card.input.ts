import { InputType } from '@nestjs/graphql';

@InputType()
export class MoveCardInput {
  id: string;
  laneId: string;
  newPosition: number;
}
