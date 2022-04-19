import { ID_FIELD_LENGTH } from '@vg/core'
import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../base.entity'
import { ProductVariantUsageHistoryScope } from '@vg/repository/enums'

@Entity('productVariantUsageHistory')
export class ProductVariantUsageHistoryEntity extends BaseEntity<any> {
  @Column('char', {
    name: 'productVariantId',
    nullable: false,
    length: ID_FIELD_LENGTH
  })
  productVariantId: string

  @Column('char', {
    name: 'storeId',
    nullable: false,
    length: ID_FIELD_LENGTH
  })
  storeId?: string

  @Column('decimal', { name: 'changeQuantity', nullable: false, default: 0 })
  changeQuantity: number

  @Column('nvarchar', {
    name: 'reason',
    nullable: false
  })
  reason: string

  @Column('nvarchar', {
    name: 'referenceId',
    nullable: true
  })
  referenceId?: string

  @Column('enum', {
    name: 'referenceScope',
    nullable: false,
    default: ProductVariantUsageHistoryScope.Order,
    enum: ProductVariantUsageHistoryScope
  })
  referenceScope: ProductVariantUsageHistoryScope
}
