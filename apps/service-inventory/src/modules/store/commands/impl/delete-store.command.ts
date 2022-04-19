import { Id } from '@vg/proto-schema'

export class DeleteStoreCommand {
  constructor(public readonly data: Id) {}
}
