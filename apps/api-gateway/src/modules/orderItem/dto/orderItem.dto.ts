import { ID, Int, ObjectType } from '@nestjs/graphql'
import { FilterableField } from '@vg/query-graphql'
import { BaseDto } from '@vg/repository/dtos'

@ObjectType('OrderItem')
export class OrderItemDto extends BaseDto {
  @FilterableField(() => ID, {
    nullable: false,
    description: 'FK - ProductVariant'
  })
  productVariantId: string

  @FilterableField(() => ID, {
    nullable: false,
    description: 'FK - Order'
  })
  orderId: string

  @FilterableField(() => String, {
    nullable: false,
    description: 'Tên hiển thị'
  })
  displayName: string

  @FilterableField(() => Number, {
    nullable: false,
    description: 'Giá đã bao gồm thuế'
  })
  priceInclTax: number

  @FilterableField(() => Number, {
    nullable: false,
    description: 'Giá chưa bao gồm thuế'
  })
  priceExclTax: number

  @FilterableField(() => Int, {
    nullable: false,
    description: 'Số lượng'
  })
  quantity: number

  @FilterableField(() => Number, {
    nullable: false,
    description: 'Tổng trước thuế'
  })
  subTotal: number

  @FilterableField(() => Number, {
    nullable: false,
    description: 'Giảm giá'
  })
  discount: number

  @FilterableField(() => Number, {
    nullable: false,
    description: 'thuế'
  })
  tax: number

  @FilterableField(() => Number, {
    nullable: false,
    description: 'thuế'
  })
  total: number
}
