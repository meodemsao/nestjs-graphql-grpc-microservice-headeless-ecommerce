import { ID_FIELD_LENGTH } from '@vg/core'
import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../base.entity'

@Entity('orderItem')
export class OrderItemEntity extends BaseEntity<any> {
  @Column('char', {
    name: 'productVariantId',
    nullable: false,
    length: ID_FIELD_LENGTH
  })
  productVariantId: string

  @Column('char', {
    name: 'orderId',
    nullable: false,
    length: ID_FIELD_LENGTH
  })
  orderId: string

  @Column('nvarchar', { name: 'displayName', nullable: false })
  displayName: string

  @Column('decimal', { name: 'priceInclTax', nullable: false, default: 0 })
  priceInclTax: number

  @Column('decimal', { name: 'priceExclTax', nullable: false, default: 0 })
  priceExclTax: number

  @Column('int', { name: 'quantity', nullable: false, default: 0 })
  quantity: number

  @Column('decimal', { name: 'subTotal', nullable: false, default: 0 })
  subTotal: number

  @Column('decimal', { name: 'discount', nullable: false, default: 0 })
  discount: number

  @Column('decimal', { name: 'tax', nullable: false, default: 0 })
  tax: number

  @Column('decimal', { name: 'total', nullable: false, default: 0 })
  total: number
}
