import { CreateTagInput } from '@vg/proto-schema'

export class CreateTagCommand {
  constructor(
    public readonly request: CreateTagInput
  ) {
  }
}
