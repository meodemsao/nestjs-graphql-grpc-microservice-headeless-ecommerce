import { CreateCollectionLocationInput } from '@vg/proto-schema'

export class CreateCollectionLocationCommand {
  constructor(
    public readonly request: CreateCollectionLocationInput
  ) {
  }
}
