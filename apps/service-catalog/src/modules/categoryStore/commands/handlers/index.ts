import { CreateCategoryStoreHandler } from '@vg/service-catalog/modules/categoryStore/commands/handlers/create-category-store.handler'
import { UpdateCategoryStoreHandler } from '@vg/service-catalog/modules/categoryStore/commands/handlers/update-category-store.handler'
import { DeleteCategoryStoreHandler } from '@vg/service-catalog/modules/categoryStore/commands/handlers/delete-category-store.handler'

export const CommandHandlers = [
  CreateCategoryStoreHandler,
  UpdateCategoryStoreHandler,
  DeleteCategoryStoreHandler
]
