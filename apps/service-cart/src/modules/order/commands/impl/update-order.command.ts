import { UpdateOrderInput } from '@vg/proto-schema'

export class UpdateOrderCommand {
  constructor(public readonly data: UpdateOrderInput) {}
}
