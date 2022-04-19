import { UpdateOrderItemInput } from '@vg/proto-schema'

export class UpdateOrderItemCommand {
  constructor(public readonly data: UpdateOrderItemInput) {}
}
