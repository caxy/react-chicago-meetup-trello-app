import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateLaneInput {
  title: string;
  position: number;
}
