import { CreateProductImageHandler } from '@vg/service-catalog/modules/productImage/commands/handlers/create-product-image.handler'
import { UpdateProductImageHandler } from '@vg/service-catalog/modules/productImage/commands/handlers/update-product-image.handler'
import { DeleteProductImageHandler } from '@vg/service-catalog/modules/productImage/commands/handlers/delete-product-image.handler'

export const CommandHandlers = [
  CreateProductImageHandler,
  UpdateProductImageHandler,
  DeleteProductImageHandler
]
