import { UpdateAttributeInput } from '@vg/proto-schema'

export class UpdateAttributeCommand {
  constructor(public readonly data: UpdateAttributeInput) {}
}
