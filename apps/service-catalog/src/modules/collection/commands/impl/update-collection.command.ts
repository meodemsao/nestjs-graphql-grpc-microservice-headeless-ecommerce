import { UpdateCollectionInput } from '@vg/proto-schema'

export class UpdateCollectionCommand {
  constructor(public readonly data: UpdateCollectionInput) {
  }
}