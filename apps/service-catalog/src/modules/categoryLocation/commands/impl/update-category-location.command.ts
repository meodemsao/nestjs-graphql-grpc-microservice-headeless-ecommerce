import { UpdateCategoryLocationInput } from '@vg/proto-schema'

export class UpdateCategoryLocationCommand {
  constructor(public readonly data: UpdateCategoryLocationInput) {
  }
}