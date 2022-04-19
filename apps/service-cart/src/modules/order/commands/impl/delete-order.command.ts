import { Id } from '@vg/proto-schema'

export class DeleteOrderCommand {
  constructor(public readonly data: Id) {}
}
