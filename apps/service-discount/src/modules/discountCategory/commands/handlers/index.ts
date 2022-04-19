import { CreateDiscountCategoryHandler } from './create-discount-category.handler'
import { UpdateDiscountCategoryHandler } from './update-discount-category.handler'
import { DeleteDiscountCategoryHandler } from './delete-discount-category.handler'

export const CommandHandlers = [
  CreateDiscountCategoryHandler,
  UpdateDiscountCategoryHandler,
  DeleteDiscountCategoryHandler
]
