import { CreateProductCollectionInput } from '@vg/proto-schema'

export class CreateProductCollectionCommand {
  constructor(
    public readonly request: CreateProductCollectionInput
  ) {
  }
}
