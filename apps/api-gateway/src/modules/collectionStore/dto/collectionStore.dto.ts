import { ID, ObjectType } from '@nestjs/graphql'
import { BaseDto } from '@vg/repository/dtos'
import {
  FilterableField
} from '@vg/query-graphql'

@ObjectType('CollectionStore')
export class CollectionStoreDto extends BaseDto {

  @FilterableField(() => ID, { nullable: false, description: 'FK - Collection' })
  collectionId: string

  @FilterableField(() => ID, { nullable: false, description: 'FK - Store' })
  storeId: string

}
