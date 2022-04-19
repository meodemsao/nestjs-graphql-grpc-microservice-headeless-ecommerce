import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../base.entity'
import {
  OrderStatus,
  PaymentStatus,
  ShippingStatus
} from '@vg/repository/enums'
import { ID_FIELD_LENGTH } from '@vg/core'

@Entity('order')
export class OrderEntity extends BaseEntity<any> {
  @Column('nvarchar', { name: 'code', nullable: false, unique: true })
  code: string

  @Column('char', {
    name: 'customerId',
    nullable: false,
    length: ID_FIELD_LENGTH
  })
  customerId: string

  @Column('decimal', { name: 'subTotal', nullable: false, default: 0 })
  subTotal: number

  @Column('decimal', { name: 'discount', nullable: false, default: 0 })
  discount: number

  @Column('decimal', { name: 'tax', nullable: false, default: 0 })
  tax: number

  @Column('decimal', { name: 'total', nullable: false, default: 0 })
  total: number

  @Column('nvarchar', { name: 'note', nullable: false, unique: true })
  note: string

  @Column('enum', {
    name: 'orderStatus',
    nullable: false,
    default: OrderStatus.Draf,
    enum: OrderStatus
  })
  orderStatus: OrderStatus

  @Column('enum', {
    name: 'paymentStatus',
    nullable: false,
    default: PaymentStatus.Pending,
    enum: PaymentStatus
  })
  paymentStatus: PaymentStatus

  @Column('enum', {
    name: 'shippingStatus',
    nullable: false,
    default: ShippingStatus.Delivering,
    enum: ShippingStatus
  })
  shippingStatus: ShippingStatus
}
