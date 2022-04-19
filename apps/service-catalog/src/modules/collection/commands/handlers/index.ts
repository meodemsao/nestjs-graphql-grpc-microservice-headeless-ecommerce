import { CreateCollectionHandler } from '@vg/service-catalog/modules/collection/commands/handlers/create-collection.handler'
import { UpdateCollectionHandler } from '@vg/service-catalog/modules/collection/commands/handlers/update-collection.handler'
import { DeleteCollectionHandler } from '@vg/service-catalog/modules/collection/commands/handlers/delete-collection.handler'

export const CommandHandlers = [
  CreateCollectionHandler,
  UpdateCollectionHandler,
  DeleteCollectionHandler
]
