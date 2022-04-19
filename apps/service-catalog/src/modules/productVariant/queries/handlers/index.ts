import { GetProductVariantHandler } from '@vg/service-catalog/modules/productVariant/queries/handlers/get-product-variant.handler'
import { GetProductVariantsHandler } from '@vg/service-catalog/modules/productVariant/queries/handlers/get-product-variants.handler'
import { GetProductVariantsTotalHandler } from '@vg/service-catalog/modules/productVariant/queries/handlers/get-product-variants-total.handler'

export const QueryHandlers = [
  GetProductVariantHandler,
  GetProductVariantsHandler,
  GetProductVariantsTotalHandler
]
