import { GetProductAttributeHandler } from '@vg/service-catalog/modules/productAttribute/queries/handlers/get-product-attribute.handler'
import { GetProductAttributesHandler } from '@vg/service-catalog/modules/productAttribute/queries/handlers/get-product-attributes.handler'
import { GetProductAttributesTotalHandler } from '@vg/service-catalog/modules/productAttribute/queries/handlers/get-product-attributes-total.handler'

export const QueryHandlers = [
  GetProductAttributeHandler,
  GetProductAttributesHandler,
  GetProductAttributesTotalHandler
]

