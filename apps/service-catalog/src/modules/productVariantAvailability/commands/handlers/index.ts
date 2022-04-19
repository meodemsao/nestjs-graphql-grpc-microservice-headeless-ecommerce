import { CreateProductVariantAvailabilityHandler } from '@vg/service-catalog/modules/productVariantAvailability/commands/handlers/create-product-variant-availability.handler'
import { UpdateProductVariantAvailabilityHandler } from '@vg/service-catalog/modules/productVariantAvailability/commands/handlers/update-product-variant-availability.handler'
import { DeleteProductVariantAvailabilityHandler } from '@vg/service-catalog/modules/productVariantAvailability/commands/handlers/delete-product-variant-availability.handler'

export const CommandHandlers = [
  CreateProductVariantAvailabilityHandler,
  UpdateProductVariantAvailabilityHandler,
  DeleteProductVariantAvailabilityHandler
]
