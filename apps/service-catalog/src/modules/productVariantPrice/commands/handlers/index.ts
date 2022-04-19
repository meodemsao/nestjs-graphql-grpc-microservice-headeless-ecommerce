import { CreateProductVariantPriceHandler } from '@vg/service-catalog/modules/productVariantPrice/commands/handlers/create-product-variant-price.handler'
import { UpdateProductVariantPriceHandler } from '@vg/service-catalog/modules/productVariantPrice/commands/handlers/update-product-variant-price.handler'
import { DeleteProductVariantPriceHandler } from '@vg/service-catalog/modules/productVariantPrice/commands/handlers/delete-product-variant-price.handler'

export const CommandHandlers = [
  CreateProductVariantPriceHandler,
  UpdateProductVariantPriceHandler,
  DeleteProductVariantPriceHandler
]
