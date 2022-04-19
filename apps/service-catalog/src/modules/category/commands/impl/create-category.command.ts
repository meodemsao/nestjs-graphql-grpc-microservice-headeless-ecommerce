import { CreateCategoryInput } from '@vg/proto-schema'

export class CreateCategoryCommand {
  constructor(
    public readonly createCategoryRequest: CreateCategoryInput
  ) {
  }
}
