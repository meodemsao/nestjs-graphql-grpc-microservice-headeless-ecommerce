import { Id } from '@vg/proto-schema'

export class DeleteDiscountManufacturerCommand {
  constructor(public readonly data: Id) {}
}
