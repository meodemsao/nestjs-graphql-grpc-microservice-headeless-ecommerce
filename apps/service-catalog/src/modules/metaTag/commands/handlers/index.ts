import { CreateMetaTagHandler } from '@vg/service-catalog/modules/metaTag/commands/handlers/create-meta-tag.handler'
import { UpdateMetaTagHandler } from '@vg/service-catalog/modules/metaTag/commands/handlers/update-meta-tag.handler'
import { DeleteMetaTagHandler } from '@vg/service-catalog/modules/metaTag/commands/handlers/delete-meta-tag.handler'

export const CommandHandlers = [
  CreateMetaTagHandler,
  UpdateMetaTagHandler,
  DeleteMetaTagHandler
]
