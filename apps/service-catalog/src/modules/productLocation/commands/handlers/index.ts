import { CreateProductLocationHandler } from '@vg/service-catalog/modules/productLocation/commands/handlers/create-product-location.handler'
import { UpdateProductLocationHandler } from '@vg/service-catalog/modules/productLocation/commands/handlers/update-product-location.handler'
import { DeleteProductLocationHandler } from '@vg/service-catalog/modules/productLocation/commands/handlers/delete-product-location.handler'

export const CommandHandlers = [
  CreateProductLocationHandler,
  UpdateProductLocationHandler,
  DeleteProductLocationHandler
]
