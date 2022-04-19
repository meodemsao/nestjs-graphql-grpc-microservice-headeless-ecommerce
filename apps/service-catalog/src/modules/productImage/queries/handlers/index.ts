import { GetProductImageHandler } from '@vg/service-catalog/modules/productImage/queries/handlers/get-product-image.handler'
import { GetProductImagesHandler } from '@vg/service-catalog/modules/productImage/queries/handlers/get-product-images.handler'
import { GetProductImagesTotalHandler } from '@vg/service-catalog/modules/productImage/queries/handlers/get-product-images-total.handler'

export const QueryHandlers = [
  GetProductImageHandler,
  GetProductImagesHandler,
  GetProductImagesTotalHandler
]

