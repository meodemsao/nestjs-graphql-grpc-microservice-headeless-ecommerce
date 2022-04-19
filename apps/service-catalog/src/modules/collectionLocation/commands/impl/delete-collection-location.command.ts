import { Id } from '@vg/proto-schema'

export class DeleteCollectionLocationCommand {
  constructor(public readonly data: Id) {
  }
}