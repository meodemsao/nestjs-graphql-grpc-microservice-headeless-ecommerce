import { CreateOrderItemHandler } from '@vg/service-cart/modules/orderItem/commands/handlers/create-order-item.handler'
import { UpdateOrderItemHandler } from '@vg/service-cart/modules/orderItem/commands/handlers/update-order-item.handler'
import { DeleteOrderItemHandler } from '@vg/service-cart/modules/orderItem/commands/handlers/delete-order-item.handler'

export const CommandHandlers = [
  CreateOrderItemHandler,
  UpdateOrderItemHandler,
  DeleteOrderItemHandler
]
