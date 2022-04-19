import { UpdateProductStoreInput } from '@vg/proto-schema'

export class UpdateProductStoreCommand {
  constructor(public readonly data: UpdateProductStoreInput) {
  }
}