import { CreateProductVariantHandler } from '@vg/service-catalog/modules/productVariant/commands/handlers/create-product-variant.handler'
import { UpdateProductVariantHandler } from '@vg/service-catalog/modules/productVariant/commands/handlers/update-product-variant.handler'
import { DeleteProductVariantHandler } from '@vg/service-catalog/modules/productVariant/commands/handlers/delete-product-variant.handler'

export const CommandHandlers = [
  CreateProductVariantHandler,
  UpdateProductVariantHandler,
  DeleteProductVariantHandler
]
