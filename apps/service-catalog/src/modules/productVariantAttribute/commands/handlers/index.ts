import { CreateProductVariantAttributeHandler } from '@vg/service-catalog/modules/productVariantAttribute/commands/handlers/create-product-variant-attribute.handler'
import { UpdateProductVariantAttributeHandler } from '@vg/service-catalog/modules/productVariantAttribute/commands/handlers/update-product-variant-attribute.handler'
import { DeleteProductVariantAttributeHandler } from '@vg/service-catalog/modules/productVariantAttribute/commands/handlers/delete-product-variant-attribute.handler'

export const CommandHandlers = [
  CreateProductVariantAttributeHandler,
  UpdateProductVariantAttributeHandler,
  DeleteProductVariantAttributeHandler
]
