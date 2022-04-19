import { ID, ObjectType } from '@nestjs/graphql'
import { FilterableField } from '@vg/query-graphql'
import { BaseDto } from '@vg/repository/dtos'
import {
  DiscountRequirementStatus,
  DiscountRequirementType,
  PaymentStatus,
  ShippingStatus
} from '@vg/repository/enums'

@ObjectType('DiscountRequirement')
export class DiscountRequirementDto extends BaseDto {
  @FilterableField(() => String, {
    nullable: false,
    description: 'Tên'
  })
  name: string

  @FilterableField(() => String, {
    nullable: false,
    description: 'Mô tả'
  })
  description: string

  @FilterableField(() => String, {
    nullable: false,
    description: 'Tham số (JSON: Key - Value)'
  })
  arguments: string

  @FilterableField(() => DiscountRequirementStatus, {
    nullable: false,
    description: 'Active | Locked | Deleted'
  })
  status: DiscountRequirementStatus

  @FilterableField(() => DiscountRequirementType, {
    nullable: false,
    description: 'TotalPriceAbove | RequireProducts'
  })
  type: DiscountRequirementType
}
