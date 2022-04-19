import { GetAttributeOptionHandler } from '@vg/service-catalog/modules/attributeOption/queries/handlers/get-attribute-option.handler'
import { GetAttributeOptionsHandler } from '@vg/service-catalog/modules/attributeOption/queries/handlers/get-attribute-options.handler'
import { GetAttributeOptionsTotalHandler } from '@vg/service-catalog/modules/attributeOption/queries/handlers/get-attribute-options-total.handler'

export const QueryHandlers = [
  GetAttributeOptionHandler,
  GetAttributeOptionsHandler,
  GetAttributeOptionsTotalHandler
]
