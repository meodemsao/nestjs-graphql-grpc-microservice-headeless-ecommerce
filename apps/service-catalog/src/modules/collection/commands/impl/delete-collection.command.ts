import { Id } from '@vg/proto-schema'

export class DeleteCollectionCommand {
  constructor(public readonly data: Id) {
  }
}