import { ID, Int, ObjectType } from '@nestjs/graphql'
import { BaseDto } from '@vg/repository/dtos'
import {
  FilterableField
} from '@vg/query-graphql'

@ObjectType('ProductCollection')
export class ProductCollectionDto extends BaseDto {

  @FilterableField(() => ID, { nullable: false, description: 'FK' })
  productId: string

  @FilterableField(() => ID, { nullable: false, description: 'FK' })
  collectionId: string

  @FilterableField(() => Int, { nullable: false, description: 'Thứ tự hiển thị' })
  sortOrder: number

}
