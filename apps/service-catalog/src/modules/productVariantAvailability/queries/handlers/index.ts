import { GetProductVariantAvailabilityHandler } from '@vg/service-catalog/modules/productVariantAvailability/queries/handlers/get-product-variant-availability.handler'
import { GetProductVariantAvailabilitiesHandler } from '@vg/service-catalog/modules/productVariantAvailability/queries/handlers/get-product-variant-availabilities.handler'
import { GetProductVariantAvailabilitiesTotalHandler } from '@vg/service-catalog/modules/productVariantAvailability/queries/handlers/get-product-variant-availabilities-total.handler'

export const QueryHandlers = [
  GetProductVariantAvailabilityHandler,
  GetProductVariantAvailabilitiesHandler,
  GetProductVariantAvailabilitiesTotalHandler
]
