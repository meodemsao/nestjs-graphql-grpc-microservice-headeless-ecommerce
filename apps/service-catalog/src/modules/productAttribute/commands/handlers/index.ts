import { CreateProductAttributeHandler } from '@vg/service-catalog/modules/productAttribute/commands/handlers/create-product-attribute.handler'
import { UpdateProductAttributeHandler } from '@vg/service-catalog/modules/productAttribute/commands/handlers/update-product-attribute.handler'
import { DeleteProductAttributeHandler } from '@vg/service-catalog/modules/productAttribute/commands/handlers/delete-product-attribute.handler'

export const CommandHandlers = [
  CreateProductAttributeHandler,
  UpdateProductAttributeHandler,
  DeleteProductAttributeHandler
]
