import { Id } from '@vg/proto-schema'

export class DeleteProductStoreCommand {
  constructor(public readonly data: Id) {
  }
}