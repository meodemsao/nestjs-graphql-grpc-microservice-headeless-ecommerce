import { ID, ObjectType } from '@nestjs/graphql'
import { BaseDto } from '@vg/repository/dtos'
import {
  FilterableField
} from '@vg/query-graphql'

@ObjectType('CategoryStore')
export class CategoryStoreDto extends BaseDto {

  @FilterableField(() => ID, { nullable: true, description: 'FK - Category' })
  categoryId: string

  @FilterableField(() => ID, { nullable: true, description: 'FK - Store' })
  storeId: string

}
