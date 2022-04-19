import { CreateProductCollectionHandler } from '@vg/service-catalog/modules/productCollection/commands/handlers/create-product-collection.handler'
import { UpdateProductCollectionHandler } from '@vg/service-catalog/modules/productCollection/commands/handlers/update-product-collection.handler'
import { DeleteProductCollectionHandler } from '@vg/service-catalog/modules/productCollection/commands/handlers/delete-product-collection.handler'

export const CommandHandlers = [
  CreateProductCollectionHandler,
  UpdateProductCollectionHandler,
  DeleteProductCollectionHandler
]
