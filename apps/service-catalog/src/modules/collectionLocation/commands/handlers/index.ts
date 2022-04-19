import { CreateCollectionLocationHandler } from '@vg/service-catalog/modules/collectionLocation/commands/handlers/create-collection-location.handler'
import { UpdateCollectionLocationHandler } from '@vg/service-catalog/modules/collectionLocation/commands/handlers/update-collection-location.handler'
import { DeleteCollectionLocationHandler } from '@vg/service-catalog/modules/collectionLocation/commands/handlers/delete-collection-location.handler'


export const CommandHandlers = [
  CreateCollectionLocationHandler,
  UpdateCollectionLocationHandler,
  DeleteCollectionLocationHandler
]
