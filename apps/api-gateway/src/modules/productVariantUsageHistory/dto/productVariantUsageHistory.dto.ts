import { ID, ObjectType } from '@nestjs/graphql'
import { FilterableField } from '@vg/query-graphql'
import { BaseDto } from '@vg/repository/dtos'
import { ProductVariantUsageHistoryScope } from '@vg/repository/enums'

@ObjectType('ProductVariantUsageHistory')
export class ProductVariantUsageHistoryDto extends BaseDto {
  @FilterableField(() => ID, { nullable: false, description: 'FK - Product' })
  productVariantId: string

  @FilterableField(() => ID, { nullable: true, description: 'FK - Store' })
  storeId?: string

  @FilterableField(() => Number, {
    nullable: false,
    description: 'Số lượng thay đổi',
    defaultValue: 0
  })
  changeQuantity: number

  @FilterableField(() => String, {
    nullable: false,
    description: 'Lý do thay đổi'
  })
  reason: string

  @FilterableField(() => String, {
    nullable: true,
    description:
      'Trong hệ thống (Guid), ngoài hệ thống phải parser từ các định dạng khác'
  })
  referenceId: string

  @FilterableField(() => ProductVariantUsageHistoryScope, {
    nullable: false,
    description: 'Order | SyncData'
  })
  referenceScope: ProductVariantUsageHistoryScope
}
