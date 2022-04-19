import { ID, ObjectType } from '@nestjs/graphql'
import { FilterableField } from '@vg/query-graphql'
import { BaseDto } from '@vg/repository/dtos'

@ObjectType('DiscountProduct')
export class DiscountProductDto extends BaseDto {
  @FilterableField(() => ID, {
    nullable: false,
    description: 'FK - Discount'
  })
  discountId: string

  @FilterableField(() => ID, {
    nullable: false,
    description: 'FK - Product'
  })
  productId: string
}
