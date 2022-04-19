import { CreateCategoryLocationInput } from '@vg/proto-schema'

export class CreateCategoryLocationCommand {
  constructor(
    public readonly request: CreateCategoryLocationInput
  ) {
  }
}
