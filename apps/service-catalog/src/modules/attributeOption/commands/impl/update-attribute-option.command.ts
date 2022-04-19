import { UpdateAttributeOptionInput } from '@vg/proto-schema'

export class UpdateAttributeOptionCommand {
  constructor(public readonly data: UpdateAttributeOptionInput) {}
}
