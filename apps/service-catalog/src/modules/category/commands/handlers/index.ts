import { CreateCategoryHandler } from '@vg/service-catalog/modules/category/commands/handlers/create-category.handler'
import { UpdateCategoryHandler } from '@vg/service-catalog/modules/category/commands/handlers/update-category.handler'
import { DeleteCategoryHandler } from '@vg/service-catalog/modules/category/commands/handlers/delete-category.handler'

export const CommandHandlers = [
  CreateCategoryHandler,
  UpdateCategoryHandler,
  DeleteCategoryHandler
]
