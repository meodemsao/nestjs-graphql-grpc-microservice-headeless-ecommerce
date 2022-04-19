import { UpdateMetaTagInput } from '@vg/proto-schema'

export class UpdateMetaTagCommand {
  constructor(public readonly data: UpdateMetaTagInput) {}
}
