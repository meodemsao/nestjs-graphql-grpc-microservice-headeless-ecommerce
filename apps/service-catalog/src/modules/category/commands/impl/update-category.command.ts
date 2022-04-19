import { UpdateCategoryInput } from '@vg/proto-schema'

export class UpdateCategoryCommand {
  constructor(public readonly data: UpdateCategoryInput) {
  }
}