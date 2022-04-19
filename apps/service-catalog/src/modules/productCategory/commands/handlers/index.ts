import { CreateProductCategoryHandler } from '@vg/service-catalog/modules/productCategory/commands/handlers/create-product-category.handler'
import { UpdateProductCategoryHandler } from '@vg/service-catalog/modules/productCategory/commands/handlers/update-product-category.handler'
import { DeleteProductCategoryHandler } from '@vg/service-catalog/modules/productCategory/commands/handlers/delete-product-category.handler'

export const CommandHandlers = [
  CreateProductCategoryHandler,
  UpdateProductCategoryHandler,
  DeleteProductCategoryHandler
]
