import { CreateAttributeOptionHandler } from '@vg/service-catalog/modules/attributeOption/commands/handlers/create-attribute-option.handler'
import { UpdateAttributeOptionHandler } from '@vg/service-catalog/modules/attributeOption/commands/handlers/update-attribute-option.handler'
import { DeleteAttributeOptionHandler } from '@vg/service-catalog/modules/attributeOption/commands/handlers/delete-attribute-option.handler'

export const CommandHandlers = [
  CreateAttributeOptionHandler,
  UpdateAttributeOptionHandler,
  DeleteAttributeOptionHandler
]
