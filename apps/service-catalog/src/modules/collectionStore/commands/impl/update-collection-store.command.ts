import { UpdateCollectionStoreInput } from '@vg/proto-schema'

export class UpdateCollectionStoreCommand {
  constructor(public readonly data: UpdateCollectionStoreInput) {
  }
}