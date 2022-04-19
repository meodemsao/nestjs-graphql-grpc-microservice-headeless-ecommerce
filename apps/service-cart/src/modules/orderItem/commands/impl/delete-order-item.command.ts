import { Id } from '@vg/proto-schema'

export class DeleteOrderItemCommand {
  constructor(public readonly data: Id) {}
}
