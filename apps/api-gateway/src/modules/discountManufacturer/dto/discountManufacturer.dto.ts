import { ID, ObjectType } from '@nestjs/graphql'
import { FilterableField } from '@vg/query-graphql'
import { BaseDto } from '@vg/repository/dtos'

@ObjectType('DiscountManufacturer')
export class DiscountManufacturerDto extends BaseDto {
  @FilterableField(() => ID, {
    nullable: false,
    description: 'FK - Discount'
  })
  discountId: string

  @FilterableField(() => ID, {
    nullable: false,
    description: 'FK - Manufacturer'
  })
  manufacturerId: string
}
