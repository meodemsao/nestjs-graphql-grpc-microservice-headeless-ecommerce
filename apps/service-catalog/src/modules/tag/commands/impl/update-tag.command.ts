import { UpdateTagInput } from '@vg/proto-schema'

export class UpdateTagCommand {
  constructor(public readonly data: UpdateTagInput) {
  }
}