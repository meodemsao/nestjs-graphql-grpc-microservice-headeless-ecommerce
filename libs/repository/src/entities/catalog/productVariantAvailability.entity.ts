import { ID_FIELD_LENGTH } from '@vg/core'
import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../base.entity'

@Entity('productVariantAvailability')
export class ProductVariantAvailabilityEntity extends BaseEntity<any> {
  @Column('char', {
    name: 'productVariantId',
    nullable: false,
    length: ID_FIELD_LENGTH
  })
  productVariantId: string

  @Column('char', {
    name: 'storeId',
    nullable: true,
    length: ID_FIELD_LENGTH
  })
  storeId?: string

  @Column('decimal', { name: 'stockAvailability', nullable: false, default: 0 })
  stockAvailability: number
}
