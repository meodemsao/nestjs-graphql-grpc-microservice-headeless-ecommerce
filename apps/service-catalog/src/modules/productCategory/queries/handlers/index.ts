import { GetProductCategoryHandler } from '@vg/service-catalog/modules/productCategory/queries/handlers/get-product-category.handler'
import { GetProductCategoriesHandler } from '@vg/service-catalog/modules/productCategory/queries/handlers/get-product-categories.handler'
import { GetProductCategoriesTotalHandler } from '@vg/service-catalog/modules/productCategory/queries/handlers/get-product-categories-total.handler'

export const QueryHandlers = [
  GetProductCategoryHandler,
  GetProductCategoriesHandler,
  GetProductCategoriesTotalHandler
]

