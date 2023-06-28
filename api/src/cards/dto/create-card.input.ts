import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateCardInput {
  id?: string;
  laneId: string;
  title: string;
  label?: string;
  description?: string;
}
