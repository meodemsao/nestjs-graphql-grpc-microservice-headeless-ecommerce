import { ID_FIELD_LENGTH } from '@vg/core'
import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../base.entity'
import { ImportPriceHistoryPriority } from '@vg/repository/enums'

@Entity('importPriceHistory')
export class ImportPriceHistoryEntity extends BaseEntity<any> {
  @Column('char', {
    name: 'productVariantId',
    nullable: false,
    length: ID_FIELD_LENGTH
  })
  productVariantId: string

  @Column('char', {
    name: 'locationId',
    nullable: true,
    length: ID_FIELD_LENGTH
  })
  locationId?: string

  @Column('char', {
    name: 'storeId',
    nullable: true,
    length: ID_FIELD_LENGTH
  })
  storeId?: string

  @Column('char', {
    name: 'taxCategory',
    nullable: false,
    length: ID_FIELD_LENGTH
  })
  taxCategory: string

  @Column('decimal', { name: 'taxValue', nullable: false, default: 0 })
  taxValue: number

  @Column('decimal', { name: 'priceExclTax', nullable: false, default: 0 })
  priceExclTax: number

  @Column('decimal', { name: 'oldPriceExclTax', nullable: false, default: 0 })
  oldPriceExclTax: number

  @Column('decimal', { name: 'priceInclTax', nullable: false, default: 0 })
  priceInclTax: number

  @Column('decimal', { name: 'oldPriceInclTax', nullable: false, default: 0 })
  oldPriceInclTax: number

  @Column('decimal', { name: 'tax', nullable: false, default: 0 })
  tax: number

  @Column({ name: 'fromDate', nullable: true, type: 'timestamp' })
  fromDate?: Date

  @Column({ name: 'toDate', nullable: true, type: 'timestamp' })
  toDate?: Date

  @Column('enum', {
    name: 'priority',
    nullable: false,
    default: ImportPriceHistoryPriority.Medium,
    enum: ImportPriceHistoryPriority
  })
  priority: ImportPriceHistoryPriority
}
