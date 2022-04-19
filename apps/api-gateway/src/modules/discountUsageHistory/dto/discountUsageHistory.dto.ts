import { ID, ObjectType } from '@nestjs/graphql'
import { FilterableField } from '@vg/query-graphql'
import { BaseDto } from '@vg/repository/dtos'

@ObjectType('DiscountUsageHistory')
export class DiscountUsageHistoryDto extends BaseDto {
  @FilterableField(() => ID, {
    nullable: false,
    description: 'FK - Discount'
  })
  discountId: string

  @FilterableField(() => ID, {
    nullable: false,
    description: 'FK - Order'
  })
  orderId: string
}
