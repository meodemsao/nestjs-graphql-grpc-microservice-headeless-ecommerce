import { CreateTagHandler } from '@vg/service-catalog/modules/tag/commands/handlers/create-tag.handler'
import { UpdateTagHandler } from '@vg/service-catalog/modules/tag/commands/handlers/update-tag.handler'
import { DeleteTagHandler } from '@vg/service-catalog/modules/tag/commands/handlers/delete-tag.handler'

export const CommandHandlers = [
  CreateTagHandler,
  UpdateTagHandler,
  DeleteTagHandler
]
