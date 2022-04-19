import { UpdateCollectionLocationInput } from '@vg/proto-schema'

export class UpdateCollectionLocationCommand {
  constructor(public readonly data: UpdateCollectionLocationInput) {
  }
}