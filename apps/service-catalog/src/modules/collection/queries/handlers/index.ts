import { GetCollectionHandler } from '@vg/service-catalog/modules/collection/queries/handlers/get-collection.handler'
import { GetCollectionsHandler } from '@vg/service-catalog/modules/collection/queries/handlers/get-collections.handler'
import { GetCollectionsTotalHandler } from '@vg/service-catalog/modules/collection/queries/handlers/get-collections-total.handler'

export const QueryHandlers = [GetCollectionHandler, GetCollectionsHandler, GetCollectionsTotalHandler]
