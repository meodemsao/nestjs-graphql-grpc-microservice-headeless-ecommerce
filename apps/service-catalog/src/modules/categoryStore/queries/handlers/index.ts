import { GetCategoryStoreHandler } from '@vg/service-catalog/modules/categoryStore/queries/handlers/get-category-store.handler'
import { GetCategoryStoresHandler } from '@vg/service-catalog/modules/categoryStore/queries/handlers/get-category-stores.handler'
import { GetCategoryStoresTotalHandler } from '@vg/service-catalog/modules/categoryStore/queries/handlers/get-category-stores-total.handler'

export const QueryHandlers = [GetCategoryStoreHandler, GetCategoryStoresHandler, GetCategoryStoresTotalHandler]
