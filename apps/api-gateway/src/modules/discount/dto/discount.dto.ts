import { Float, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql'
import { FilterableField } from '@vg/query-graphql'
import { BaseDto } from '@vg/repository/dtos'
import {
  DiscountLimitation,
  DiscountPriority,
  DiscountStatus,
  DiscountType
} from '@vg/repository/enums'

@ObjectType('Discount')
export class DiscountDto extends BaseDto {
  @FilterableField(() => String, {
    nullable: false,
    description: 'Tên giảm giá'
  })
  name: string

  @FilterableField(() => String, {
    nullable: false,
    description: 'Mô tả',
    defaultValue: ''
  })
  description: string

  @FilterableField(() => Boolean, {
    nullable: false,
    description: 'Yêu cầu mã giảm giá'
  })
  requireCouponCode: boolean

  @FilterableField(() => String, {
    nullable: true,
    description: 'Mã giảm giá (Unique)'
  })
  couponCode: string

  @FilterableField(() => GraphQLISODateTime, {
    nullable: true,
    description: 'Ngày bắt đầu'
  })
  startAt?: Date

  @FilterableField(() => GraphQLISODateTime, {
    nullable: true,
    description: 'Ngày kết thúc'
  })
  endAt?: Date

  @FilterableField(() => DiscountType, {
    nullable: false,
    description: 'All | Category | Product | Manufacturer'
  })
  discountType: DiscountType

  @FilterableField(() => Float, {
    nullable: false,
    description: 'Số tiền giảm giá'
  })
  discountAmount: number

  @FilterableField(() => Boolean, {
    nullable: false,
    description: 'Sử dụng phần trăm',
    defaultValue: false
  })
  usePercentage: boolean

  @FilterableField(() => Float, {
    nullable: false,
    description: 'Phần trăm giảm giá'
  })
  discountPercentage: number

  @FilterableField(() => Float, {
    nullable: true,
    description: 'Số tiền giảm giá tối đa'
  })
  maximumDiscountAmount?: number

  @FilterableField(() => Boolean, {
    nullable: false,
    description: 'Cho phép cộng dồn với giảm giá khác',
    defaultValue: false
  })
  isCumulative: boolean

  @FilterableField(() => DiscountLimitation, {
    nullable: false,
    description: 'Unlimited | NTimes | NTimesPerUser'
  })
  discountLimitation: DiscountLimitation

  @FilterableField(() => Int, {
    nullable: false,
    defaultValue: false,
    description: 'Số lần sử dụng'
  })
  limitationTimes: number

  @FilterableField(() => String, {
    nullable: true,
    description: 'FK - DiscountRequirement'
  })
  discountRequirementId?: string

  @FilterableField(() => DiscountPriority, {
    nullable: false,
    description: 'Low | Medium | High'
  })
  priority: DiscountPriority

  @FilterableField(() => DiscountStatus, {
    nullable: false,
    description: 'Active | Locked | Deleted'
  })
  status: DiscountStatus
}
