import { CreateCollectionInput } from '@vg/proto-schema'

export class CreateCollectionCommand {
  constructor(
    public readonly request: CreateCollectionInput
  ) {
  }
}
