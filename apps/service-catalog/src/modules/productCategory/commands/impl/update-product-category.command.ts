import { UpdateProductCategoryInput } from '@vg/proto-schema'

export class UpdateProductCategoryCommand {
  constructor(public readonly data: UpdateProductCategoryInput) {
  }
}