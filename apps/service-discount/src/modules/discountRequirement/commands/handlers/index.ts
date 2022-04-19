import { CreateDiscountRequirementHandler } from './create-discount-requirement.handler'
import { UpdateDiscountRequirementHandler } from './update-discount-requirement.handler'
import { DeleteDiscountRequirementHandler } from './delete-discount-requirement.handler'

export const CommandHandlers = [
  CreateDiscountRequirementHandler,
  UpdateDiscountRequirementHandler,
  DeleteDiscountRequirementHandler
]
