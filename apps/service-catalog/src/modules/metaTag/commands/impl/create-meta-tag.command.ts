import { CreateMetaTagInput } from '@vg/proto-schema'

export class CreateMetaTagCommand {
  constructor(public readonly request: CreateMetaTagInput) {}
}
