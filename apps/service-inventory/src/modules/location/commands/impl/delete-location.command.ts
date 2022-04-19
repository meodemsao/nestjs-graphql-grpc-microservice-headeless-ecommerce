import { Id } from '@vg/proto-schema'

export class DeleteLocationCommand {
  constructor(public readonly data: Id) {}
}
