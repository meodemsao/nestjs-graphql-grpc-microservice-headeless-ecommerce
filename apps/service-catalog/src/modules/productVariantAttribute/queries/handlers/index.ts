import { GetProductVariantAttributeHandler } from '@vg/service-catalog/modules/productVariantAttribute/queries/handlers/get-product-variant-attribute.handler'
import { GetProductVariantAttributesHandler } from '@vg/service-catalog/modules/productVariantAttribute/queries/handlers/get-product-variant-attributes.handler'
import { GetProductVariantAttributesTotalHandler } from '@vg/service-catalog/modules/productVariantAttribute/queries/handlers/get-product-variant-attributes-total.handler'

export const QueryHandlers = [
  GetProductVariantAttributeHandler,
  GetProductVariantAttributesHandler,
  GetProductVariantAttributesTotalHandler
]
