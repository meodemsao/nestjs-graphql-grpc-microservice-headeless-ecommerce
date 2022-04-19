import { CreateOrderHandler } from '@vg/service-cart/modules/order/commands/handlers/create-order.handler'
import { UpdateOrderHandler } from '@vg/service-cart/modules/order/commands/handlers/update-order.handler'
import { DeleteOrderHandler } from '@vg/service-cart/modules/order/commands/handlers/delete-order.handler'

export const CommandHandlers = [
  CreateOrderHandler,
  UpdateOrderHandler,
  DeleteOrderHandler
]
