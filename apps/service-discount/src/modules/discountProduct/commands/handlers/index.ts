import { CreateDiscountProductHandler } from './create-discount-product.handler'
import { UpdateDiscountProductHandler } from './update-discount-product.handler'
import { DeleteDiscountProductHandler } from './delete-discount-product.handler'

export const CommandHandlers = [
  CreateDiscountProductHandler,
  UpdateDiscountProductHandler,
  DeleteDiscountProductHandler
]
