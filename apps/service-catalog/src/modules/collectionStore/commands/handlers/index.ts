import { CreateCollectionStoreHandler } from '@vg/service-catalog/modules/collectionStore/commands/handlers/create-collection-store.handler'
import { UpdateCollectionStoreHandler } from '@vg/service-catalog/modules/collectionStore/commands/handlers/update-collection-store.handler'
import { DeleteCollectionStoreHandler } from '@vg/service-catalog/modules/collectionStore/commands/handlers/delete-collection-store.handler'


export const CommandHandlers = [
  CreateCollectionStoreHandler,
  UpdateCollectionStoreHandler,
  DeleteCollectionStoreHandler
]
