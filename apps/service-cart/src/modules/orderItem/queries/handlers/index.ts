import { GetOrderItemHandler } from '@vg/service-cart/modules/orderItem/queries/handlers/get-order-item.handler'
import { GetOrderItemsHandler } from '@vg/service-cart/modules/orderItem/queries/handlers/get-order-items.handler'
import { GetOrderItemsTotalHandler } from '@vg/service-cart/modules/orderItem/queries/handlers/get-order-items-total.handler'

export const QueryHandlers = [
  GetOrderItemHandler,
  GetOrderItemsHandler,
  GetOrderItemsTotalHandler
]
