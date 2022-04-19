import { ArgsType, Field, ID } from '@nestjs/graphql'

@ArgsType()
export class BaseUniqueFilterArgs {
  @Field(() => ID, { nullable: false })
  id: string
}