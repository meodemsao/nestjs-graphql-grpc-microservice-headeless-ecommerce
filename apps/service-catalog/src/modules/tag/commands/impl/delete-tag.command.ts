import { Id } from '@vg/proto-schema'

export class DeleteTagCommand {
  constructor(public readonly data: Id) {
  }
}