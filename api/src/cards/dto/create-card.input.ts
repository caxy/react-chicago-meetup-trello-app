import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateCardInput {
  laneId: string;
  title: string;
  label?: string;
  description?: string;
}
