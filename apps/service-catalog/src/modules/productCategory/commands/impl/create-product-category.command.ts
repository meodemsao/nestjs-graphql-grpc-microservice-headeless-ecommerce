import { CreateProductCategoryInput } from '@vg/proto-schema'

export class CreateProductCategoryCommand {
  constructor(
    public readonly request: CreateProductCategoryInput
  ) {
  }
}
