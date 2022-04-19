import { GetAttributeHandler } from '@vg/service-catalog/modules/attribute/queries/handlers/get-attribute.handler'
import { GetAttributesHandler } from '@vg/service-catalog/modules/attribute/queries/handlers/get-attributes.handler'
import { GetAttributesTotalHandler } from '@vg/service-catalog/modules/attribute/queries/handlers/get-attributes-total.handler'

export const QueryHandlers = [
  GetAttributeHandler,
  GetAttributesHandler,
  GetAttributesTotalHandler
]
