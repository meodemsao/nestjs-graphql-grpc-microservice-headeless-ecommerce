import { ID, ObjectType } from '@nestjs/graphql'
import { BaseDto } from '@vg/repository/dtos'
import {
  FilterableField
} from '@vg/query-graphql'

@ObjectType('ProductLocation')
export class ProductLocationDto extends BaseDto {

  @FilterableField(() => ID, { nullable: false, description: 'FK' })
  productId: string

  @FilterableField(() => ID, { nullable: false, description: 'FK' })
  locationId: string

}
