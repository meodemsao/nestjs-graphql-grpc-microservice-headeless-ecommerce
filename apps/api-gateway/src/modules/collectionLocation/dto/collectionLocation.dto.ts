import { ID, ObjectType } from '@nestjs/graphql'
import { BaseDto } from '@vg/repository/dtos'
import {
  FilterableField
} from '@vg/query-graphql'

@ObjectType('CollectionLocation')
export class CollectionLocationDto extends BaseDto {

  @FilterableField(() => ID, { nullable: true, description: 'FK - Collection' })
  collectionId: string

  @FilterableField(() => ID, { nullable: true, description: 'FK - Location' })
  locationId: string

}
