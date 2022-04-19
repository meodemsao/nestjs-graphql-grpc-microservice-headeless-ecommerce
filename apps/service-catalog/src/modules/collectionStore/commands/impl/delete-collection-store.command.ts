import { Id } from '@vg/proto-schema'

export class DeleteCollectionStoreCommand {
  constructor(public readonly data: Id) {
  }
}