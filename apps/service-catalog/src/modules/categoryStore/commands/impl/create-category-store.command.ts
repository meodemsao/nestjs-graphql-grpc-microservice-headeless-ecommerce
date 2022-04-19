import { CreateCategoryStoreInput } from '@vg/proto-schema'

export class CreateCategoryStoreCommand {
  constructor(
    public readonly request: CreateCategoryStoreInput
  ) {
  }
}
