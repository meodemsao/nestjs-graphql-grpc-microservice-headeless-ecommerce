import { GetOrderHandler } from '@vg/service-cart/modules/order/queries/handlers/get-order.handler'
import { GetOrdersHandler } from '@vg/service-cart/modules/order/queries/handlers/get-orders.handler'
import { GetOrdersTotalHandler } from '@vg/service-cart/modules/order/queries/handlers/get-orders-total.handler'

export const QueryHandlers = [
  GetOrderHandler,
  GetOrdersHandler,
  GetOrdersTotalHandler
]
