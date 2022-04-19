import { CreateProductStoreHandler } from '@vg/service-catalog/modules/productStore/commands/handlers/create-product-store.handler'
import { UpdateProductStoreHandler } from '@vg/service-catalog/modules/productStore/commands/handlers/update-product-store.handler'
import { DeleteProductStoreHandler } from '@vg/service-catalog/modules/productStore/commands/handlers/delete-product-store.handler'

export const CommandHandlers = [
  CreateProductStoreHandler,
  UpdateProductStoreHandler,
  DeleteProductStoreHandler
]
