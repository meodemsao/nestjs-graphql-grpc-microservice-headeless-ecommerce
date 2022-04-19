import { CreateTemplateHandler } from '@vg/service-catalog/modules/template/commands/handlers/create-template.handler'
import { UpdateTemplateHandler } from '@vg/service-catalog/modules/template/commands/handlers/update-template.handler'
import { DeleteTemplateHandler } from '@vg/service-catalog/modules/template/commands/handlers/delete-template.handler'

export const CommandHandlers = [
  CreateTemplateHandler,
  UpdateTemplateHandler,
  DeleteTemplateHandler
]
