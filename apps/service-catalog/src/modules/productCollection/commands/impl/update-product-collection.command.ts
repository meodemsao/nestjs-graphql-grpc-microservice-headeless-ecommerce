import { UpdateProductCollectionInput } from '@vg/proto-schema'

export class UpdateProductCollectionCommand {
  constructor(public readonly data: UpdateProductCollectionInput) {
  }
}