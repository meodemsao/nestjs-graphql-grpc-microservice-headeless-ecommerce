import { GetProductHandler } from '@vg/service-catalog/modules/product/queries/handlers/get-product.handler'
import { GetProductsHandler } from '@vg/service-catalog/modules/product/queries/handlers/get-products.handler'
import { GetProductsTotalHandler } from '@vg/service-catalog/modules/product/queries/handlers/get-products-total.handler'

export const QueryHandlers = [
  GetProductHandler,
  GetProductsHandler,
  GetProductsTotalHandler
]

