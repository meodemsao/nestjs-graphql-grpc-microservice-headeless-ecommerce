import { Id } from '@vg/proto-schema'

export class DeleteDiscountCommand {
  constructor(public readonly data: Id) {}
}
