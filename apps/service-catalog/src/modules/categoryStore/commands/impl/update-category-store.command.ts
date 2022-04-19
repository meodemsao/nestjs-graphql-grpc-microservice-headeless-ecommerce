import { UpdateCategoryStoreInput } from '@vg/proto-schema'

export class UpdateCategoryStoreCommand {
  constructor(public readonly data: UpdateCategoryStoreInput) {
  }
}