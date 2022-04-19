import { Id } from '@vg/proto-schema'

export class DeleteMetaTagCommand {
  constructor(public readonly data: Id) {}
}
