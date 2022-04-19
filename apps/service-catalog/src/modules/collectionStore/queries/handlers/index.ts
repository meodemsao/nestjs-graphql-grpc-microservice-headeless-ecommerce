import { GetCollectionStoreHandler } from '@vg/service-catalog/modules/collectionStore/queries/handlers/get-collection-store.handler'
import { GetCollectionStoresHandler } from '@vg/service-catalog/modules/collectionStore/queries/handlers/get-collection-stores.handler'
import { GetCollectionStoresTotalHandler } from '@vg/service-catalog/modules/collectionStore/queries/handlers/get-collection-stores-total.handler'


export const QueryHandlers = [
  GetCollectionStoreHandler,
  GetCollectionStoresHandler,
  GetCollectionStoresTotalHandler
]

