import { GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql'
import { FilterableField } from '@vg/query-graphql'
import { BaseDto } from '@vg/repository/dtos'
import {
  ProductVariantPricePriority,
  ProductVariantPriceScope
} from '@vg/repository/enums'

@ObjectType('ProductVariantPrice')
export class ProductVariantPriceDto extends BaseDto {
  @FilterableField(() => ID, { nullable: false, description: 'FK - Product' })
  productVariantId: string

  @FilterableField(() => ID, { nullable: true, description: 'FK - Location' })
  locationId?: string

  @FilterableField(() => ID, { nullable: true, description: 'FK - Store' })
  storeId?: string

  @FilterableField(() => ID, {
    nullable: false,
    description: 'Danh mục tính thuế'
  })
  taxCategory: string

  @FilterableField(() => Number, {
    nullable: false,
    description: 'Phần trăm thuế (giá trị chỉ đọc)',
    defaultValue: 0
  })
  taxPercent: number

  @FilterableField(() => Number, {
    nullable: false,
    description: 'Giá chưa thuế',
    defaultValue: 0
  })
  priceExclTax: number

  @FilterableField(() => Number, {
    nullable: false,
    description: 'Giá cũ chưa thuế',
    defaultValue: 0
  })
  oldPriceExclTax: number

  @FilterableField(() => Number, {
    nullable: false,
    description: 'Giá đã bao gồm thuế',
    defaultValue: 0
  })
  priceInclTax: number

  @FilterableField(() => Number, {
    nullable: false,
    description: 'Giá cũ đã bao gồm thuế',
    defaultValue: 0
  })
  oldPriceInclTax: number

  @FilterableField(() => Number, {
    nullable: false,
    description: 'Thuế'
  })
  tax: number

  @FilterableField(() => GraphQLISODateTime, {
    nullable: true,
    description: 'Từ ngày'
  })
  toDate?: Date

  @FilterableField(() => GraphQLISODateTime, {
    nullable: true,
    description: 'Đến ngày'
  })
  fromDate?: Date

  @FilterableField(() => ProductVariantPricePriority, {
    nullable: false,
    description: 'Độ ưu tiên (High | Medium | Low)'
  })
  priority: ProductVariantPricePriority

  @FilterableField(() => ProductVariantPriceScope, {
    nullable: false,
    description: 'Order | SyncData'
  })
  referenceScope: ProductVariantPriceScope
}
