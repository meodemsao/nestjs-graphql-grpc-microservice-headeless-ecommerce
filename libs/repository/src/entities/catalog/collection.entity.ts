import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../base.entity'
import { ID_FIELD_LENGTH } from '@vg/core'
import { CollectionStatus } from '@vg/repository/enums'

@Entity('collection')
export class CollectionEntity extends BaseEntity<any> {
  @Column('nvarchar', { name: 'name', nullable: false })
  name: string

  @Column('nvarchar', { name: 'slug', nullable: false })
  slug: string

  @Column('nvarchar', { name: 'shortDescription', nullable: true })
  shortDescription: string

  @Column('nvarchar', { name: 'longDescription', nullable: true })
  longDescription: string

  @Column('nvarchar', { name: 'thumbnailUrl', nullable: true })
  thumbnailUrl: string

  @Column('nvarchar', { name: 'backgroundUrl', nullable: true })
  backgroundUrl: string

  @Column('char', { name: 'templateId', nullable: true, length: ID_FIELD_LENGTH })
  templateId: string

  @Column('varchar', { name: 'sortOrder', nullable: false, default: 0 })
  sortOrder: number

  @Column('int', { name: 'metaTitle', nullable: true })
  metaTitle: string

  @Column('nvarchar', { name: 'metaDescription', nullable: true })
  metaDescription: string

  @Column('nvarchar', { name: 'metaKeywords', nullable: true })
  metaKeywords: string

  @Column('bool', { name: 'allowCustomMetaTag', nullable: false, default: false })
  allowCustomMetaTag: boolean

  @Column('bool', { name: 'limitedToLocations', nullable: false, default: false })
  limitedToLocations: boolean

  @Column('bool', { name: 'limitedToStores', nullable: false, default: false })
  limitedToStores: boolean

  @Column('int', { name: 'pageSize', nullable: false, default: 12 })
  pageSize: number

  @Column('simple-array', { name: 'pageSizeOption', nullable: false })
  pageSizeOption: number[]

  @Column('bool', { name: 'allowCustomersToSelectPageSize', nullable: false, default: false })
  allowCustomersToSelectPageSize: boolean

  @Column('bool', { name: 'priceRangeFiltering', nullable: false, default: false })
  priceRangeFiltering: boolean

  @Column('bool', { name: 'manuallyPriceRange', nullable: false, default: false })
  manuallyPriceRange: boolean

  @Column('decimal', { name: 'priceFrom', nullable: false, default: 0 })
  priceFrom: number

  @Column('decimal', { name: 'priceTo', nullable: false, default: 0 })
  priceTo: number

  @Column('enum', { name: 'status', nullable: false, default: CollectionStatus.Active, enum: CollectionStatus })
  status: CollectionStatus

}
