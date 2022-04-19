import { CreateAttributeHandler } from '@vg/service-catalog/modules/attribute/commands/handlers/create-attribute.handler'
import { UpdateAttributeHandler } from '@vg/service-catalog/modules/attribute/commands/handlers/update-attribute.handler'
import { DeleteAttributeHandler } from '@vg/service-catalog/modules/attribute/commands/handlers/delete-attribute.handler'

export const CommandHandlers = [
  CreateAttributeHandler,
  UpdateAttributeHandler,
  DeleteAttributeHandler
]
