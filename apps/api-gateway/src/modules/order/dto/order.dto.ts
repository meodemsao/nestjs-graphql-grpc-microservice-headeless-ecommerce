import { ID, ObjectType } from '@nestjs/graphql'
import { FilterableField } from '@vg/query-graphql'
import { BaseDto } from '@vg/repository/dtos'
import {
  OrderStatus,
  PaymentStatus,
  ShippingStatus
} from '@vg/repository/enums'

@ObjectType('Order')
export class OrderDto extends BaseDto {
  @FilterableField(() => String, {
    nullable: false,
    description: 'Mã đơn hàng (Unique)'
  })
  code: string

  @FilterableField(() => ID, {
    nullable: false,
    description: 'FK - UserId'
  })
  customerId: string

  @FilterableField(() => Number, {
    nullable: false,
    description: 'Tổng trước thuế'
  })
  subTotal: number

  @FilterableField(() => Number, {
    nullable: false,
    description: 'Giảm giá'
  })
  discount: number

  @FilterableField(() => Number, {
    nullable: false,
    description: 'Thuế'
  })
  tax: number

  @FilterableField(() => Number, {
    nullable: false,
    description: 'Tổng giá trị đơn hàng'
  })
  total: number

  @FilterableField(() => OrderStatus, {
    nullable: false,
    description:
      'Trạng thái đơn hàng (Draf | WaitForConfirmation | ReadyForDelivery | Delivery | Delivered | Canceled)'
  })
  orderStatus: OrderStatus

  @FilterableField(() => PaymentStatus, {
    nullable: false,
    description: 'Trạng thái thanh toán (Pending | Paid | UnPaid)'
  })
  paymentStatus: PaymentStatus

  @FilterableField(() => ShippingStatus, {
    nullable: false,
    description:
      'Trạng thái vận chuyển (Các trạng thái con khi đơn hàng đang Delivery - Bàn sau)'
  })
  shippingStatus: ShippingStatus
}
