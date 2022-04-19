import { GetCategoryHandler } from '@vg/service-catalog/modules/category/queries/handlers/get-category.handler'
import { GetCategoriesHandler } from '@vg/service-catalog/modules/category/queries/handlers/get-categories.handler'
import { GetCategoriesTotalHandler } from '@vg/service-catalog/modules/category/queries/handlers/get-categories-total.handler'

export const QueryHandlers = [GetCategoryHandler, GetCategoriesHandler, GetCategoriesTotalHandler]
