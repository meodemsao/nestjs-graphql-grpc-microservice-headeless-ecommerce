import { Id } from '@vg/proto-schema'

export class DeleteProductCollectionCommand {
  constructor(public readonly data: Id) {
  }
}