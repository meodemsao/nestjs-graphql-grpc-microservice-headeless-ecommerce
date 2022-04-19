import {
  BeforeCreateOne,
  CreateOneInputType,
  FilterableField
} from '@vg/query-graphql'
import { GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
@BeforeCreateOne((dto: CreateOneInputType<BaseDto>) => {
  dto.input.createdAt = new Date()
  return dto
})
export class BaseDto {
  @FilterableField(() => ID)
  id!: string

  @FilterableField(() => GraphQLISODateTime, {nullable: true})
  createdAt?: Date

  @FilterableField(() => GraphQLISODateTime, {nullable: true})
  updatedAt?: Date

  @FilterableField(() => GraphQLISODateTime, {nullable: true})
  deletedAt?: Date

  @FilterableField(() => String, {nullable: true})
  createdBy?: string

  @FilterableField(() => String, {nullable: true})
  updatedBy?: string
}
  