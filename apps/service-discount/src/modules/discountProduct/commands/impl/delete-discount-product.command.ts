import { Id } from '@vg/proto-schema'

export class DeleteDiscountProductCommand {
  constructor(public readonly data: Id) {}
}
