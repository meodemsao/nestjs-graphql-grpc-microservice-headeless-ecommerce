import { ID, Int, ObjectType } from '@nestjs/graphql'
import { BaseDto } from '@vg/repository/dtos'
import { FilterableField } from '@vg/query-graphql'

@ObjectType('ProductVariantAvailability')
export class ProductVariantAvailabilityDto extends BaseDto {
  @FilterableField(() => ID, { nullable: false, description: 'FK - Product' })
  productVariantId: string

  @FilterableField(() => ID, { nullable: false, description: 'FK - Store' })
  storeId: string

  @FilterableField(() => Number, {
    nullable: false,
    description: 'Số lượng tồn kho'
  })
  stockAvailability: number
}
