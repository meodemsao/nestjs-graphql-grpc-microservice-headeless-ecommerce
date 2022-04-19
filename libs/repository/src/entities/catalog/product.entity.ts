import { BeforeInsert, Column, Entity } from 'typeorm'
import { BaseEntity } from '../base.entity'
import { ProductStatus, ProductType } from '@vg/repository/enums'
import { ID_FIELD_LENGTH } from '@vg/core'
import { initNewDate } from '@vg/common'

@Entity('product')
export class ProductEntity extends BaseEntity<any> {
  @Column('nvarchar', { name: 'name', nullable: false })
  name: string

  @Column('nvarchar', { name: 'slug', nullable: false, unique: true })
  slug: string

  @Column('nvarchar', { name: 'shortDescription', nullable: true })
  shortDescription: string

  @Column('nvarchar', { name: 'longDescription', nullable: true, length: 1024 })
  longDescription: string

  @Column('nvarchar', { name: 'thumbnailUrl', nullable: true })
  thumbnailUrl: string

  @Column('enum', { name: 'productType', nullable: false, enum: ProductType })
  productType: ProductType

  @Column('char', { name: 'productTemplateId', nullable: true, length: ID_FIELD_LENGTH })
  productTemplateId: string

  @Column('char', { name: 'manufacturerId', nullable: true, length: ID_FIELD_LENGTH })
  manufacturerId: string

  @Column('varchar', { name: 'sortOrder', nullable: false, default: 0 })
  sortOrder: number

  @Column('nvarchar', { name: 'metaTitle', nullable: true })
  metaTitle: string

  @Column('nvarchar', { name: 'metaDescription', nullable: true })
  metaDescription: string

  @Column('nvarchar', { name: 'metaKeywords', nullable: true })
  metaKeywords: string

  @Column('nvarchar', { name: 'tags', nullable: true })
  tags: string

  @Column('bool', { name: 'allowCustomMetaTag', nullable: false, default: false })
  allowCustomMetaTag: boolean

  @Column('bool', { name: 'limitedToLocations', nullable: false, default: false })
  limitedToLocations: boolean

  @Column('bool', { name: 'limitedToStores', nullable: false, default: false })
  limitedToStores: boolean

  @Column('enum', { name: 'status', nullable: false, default: ProductStatus.Active, enum: ProductStatus })
  status: ProductStatus

  @Column('bool', { name: 'displayPrice', nullable: false, default: true })
  displayPrice: boolean

  @Column('bool', { name: 'shippable', nullable: false, default: true })
  shippable: boolean

  @Column('decimal', { name: 'weight', nullable: false, default: 0 })
  weight: number

  @Column('decimal', { name: 'length', nullable: false, default: 0 })
  length: number

  @Column('decimal', { name: 'width', nullable: false, default: 0 })
  width: number

  @Column('decimal', { name: 'height', nullable: false, default: 0 })
  height: number

  @Column('char', { name: 'taxCategory', nullable: true, length: ID_FIELD_LENGTH })
  taxCategory: string

  @Column('decimal', { name: 'taxPercent', nullable: false, default: 0 })
  taxPercent: number

  @Column('decimal', { name: 'priceExclTax', nullable: false, default: 0 })
  priceExclTax: number

  @Column('decimal', { name: 'priceInclTax', nullable: false, default: 0 })
  priceInclTax: number

  @Column('nvarchar', { name: 'unit', nullable: false })
  unit: string

  @Column('int', { name: 'stockAvailability', nullable: false, default: 0 })
  stockAvailability: number

  @Column('json', { name: 'attributes', nullable: true })
  attributes: string

  @Column('json', { name: 'variantAttributes', nullable: true })
  variantAttributes: string
}
