import { CreateCollectionStoreInput } from '@vg/proto-schema'

export class CreateCollectionStoreCommand {
  constructor(
    public readonly request: CreateCollectionStoreInput
  ) {
  }
}
