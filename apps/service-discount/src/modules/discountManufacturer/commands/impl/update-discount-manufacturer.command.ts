import { UpdateDiscountManufacturerInput } from '@vg/proto-schema'

export class UpdateDiscountManufacturerCommand {
  constructor(public readonly data: UpdateDiscountManufacturerInput) {}
}
