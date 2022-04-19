import { GetProductVariantPriceHandler } from '@vg/service-catalog/modules/productVariantPrice/queries/handlers/get-product-variant-price.handler'
import { GetProductVariantPricesHandler } from '@vg/service-catalog/modules/productVariantPrice/queries/handlers/get-product-variant-prices.handler'
import { GetProductVariantPricesTotalHandler } from '@vg/service-catalog/modules/productVariantPrice/queries/handlers/get-product-variant-prices-total.handler'

export const QueryHandlers = [
  GetProductVariantPriceHandler,
  GetProductVariantPricesHandler,
  GetProductVariantPricesTotalHandler
]
