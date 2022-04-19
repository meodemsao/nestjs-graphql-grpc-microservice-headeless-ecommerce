import { CreateCategoryLocationHandler } from '@vg/service-catalog/modules/categoryLocation/commands/handlers/create-category-location.handler'
import { UpdateCategoryLocationHandler } from '@vg/service-catalog/modules/categoryLocation/commands/handlers/update-category-location.handler'
import { DeleteCategoryLocationHandler } from '@vg/service-catalog/modules/categoryLocation/commands/handlers/delete-category-location.handler'

export const CommandHandlers = [
  CreateCategoryLocationHandler,
  UpdateCategoryLocationHandler,
  DeleteCategoryLocationHandler
]
