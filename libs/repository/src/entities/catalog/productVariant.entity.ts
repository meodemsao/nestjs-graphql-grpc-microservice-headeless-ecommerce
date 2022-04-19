import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../base.entity'
import { ID_FIELD_LENGTH } from '@vg/core'
import { ProductVariantStatus } from '@vg/repository/enums'

@Entity('productVariant')
export class ProductVariantEntity extends BaseEntity<any> {
  @Column('char', {
    name: 'productId',
    nullable: false,
    length: ID_FIELD_LENGTH
  })
  productId: string

  @Column('nvarchar', {
    name: 'name',
    nullable: false
  })
  name: string

  @Column('nvarchar', {
    name: 'sku',
    nullable: true
  })
  sku?: string

  @Column('nvarchar', {
    name: 'manufacturerPartNumber',
    nullable: false
  })
  manufacturerPartNumber: string

  @Column('nvarchar', {
    name: 'thubnailUrl',
    nullable: false
  })
  thubnailUrl: string

  @Column('enum', {
    name: 'status',
    nullable: false,
    default: ProductVariantStatus.Active,
    enum: ProductVariantStatus
  })
  status: ProductVariantStatus

  @Column('bool', {
    name: 'displayPrice',
    nullable: false,
    default: true
  })
  displayPrice: boolean

  @Column('bool', {
    name: 'shipable',
    nullable: false,
    default: true
  })
  shipable: boolean

  @Column('decimal', { name: 'weight', nullable: true, default: 0 })
  weight: number

  @Column('decimal', { name: 'length', nullable: true, default: 0 })
  length: number

  @Column('decimal', { name: 'width', nullable: true, default: 0 })
  width: number

  @Column('decimal', { name: 'height', nullable: true, default: 0 })
  height: number

  @Column('char', {
    name: 'taxCategory',
    nullable: false,
    length: ID_FIELD_LENGTH
  })
  taxCategory: string

  @Column('decimal', { name: 'taxPercent', nullable: false, default: 0 })
  taxPercent: number

  @Column('decimal', { name: 'priceExclTax', nullable: false, default: 0 })
  priceExclTax: number

  @Column('decimal', { name: 'oldPriceExclTax', nullable: false, default: 0 })
  oldPriceExclTax: number

  @Column('decimal', { name: 'priceInclTax', nullable: false, default: 0 })
  priceInclTax: number

  @Column('decimal', { name: 'oldPriceInclTax', nullable: false, default: 0 })
  oldPriceInclTax: number

  @Column('nvarchar', {
    name: 'priceList',
    nullable: false
  })
  priceList: string

  @Column('nvarchar', {
    name: 'unit',
    nullable: false
  })
  unit: string

  @Column('int', {
    name: 'stockAvailability',
    nullable: false
  })
  stockAvailability: number

  @Column('bool', {
    name: 'trackInventory',
    nullable: false,
    default: false
  })
  trackInventory: boolean

  @Column('nvarchar', {
    name: 'variantAttributes',
    nullable: false
  })
  variantAttributes: string
}
