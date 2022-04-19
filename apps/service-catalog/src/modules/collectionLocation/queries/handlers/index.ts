import { GetCollectionLocationHandler } from '@vg/service-catalog/modules/collectionLocation/queries/handlers/get-collection-location.handler'
import { GetCollectionLocationsHandler } from '@vg/service-catalog/modules/collectionLocation/queries/handlers/get-collection-locations.handler'
import { GetCollectionLocationsTotalHandler } from '@vg/service-catalog/modules/collectionLocation/queries/handlers/get-collection-locations-total.handler'


export const QueryHandlers = [GetCollectionLocationHandler, GetCollectionLocationsHandler, GetCollectionLocationsTotalHandler]
