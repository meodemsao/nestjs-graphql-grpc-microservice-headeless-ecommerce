import { UpdateDiscountCategoryInput } from '@vg/proto-schema'

export class UpdateDiscountCategoryCommand {
  constructor(public readonly data: UpdateDiscountCategoryInput) {}
}
