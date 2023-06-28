import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateLaneInput {
  title: string;
}
