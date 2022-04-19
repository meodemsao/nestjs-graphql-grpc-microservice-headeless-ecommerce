import { CreateProductHandler } from '@vg/service-catalog/modules/product/commands/handlers/create-product.handler'
import { UpdateProductHandler } from '@vg/service-catalog/modules/product/commands/handlers/update-product.handler'
import { DeleteProductHandler } from '@vg/service-catalog/modules/product/commands/handlers/delete-product.handler'

export const CommandHandlers = [
  CreateProductHandler,
  UpdateProductHandler,
  DeleteProductHandler
]
