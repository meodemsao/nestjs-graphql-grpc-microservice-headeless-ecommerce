import { UpdateLocationInput } from '@vg/proto-schema'

export class UpdateLocationCommand {
  constructor(public readonly data: UpdateLocationInput) {}
}
