import { UpdateDiscountInput } from '@vg/proto-schema'

export class UpdateDiscountCommand {
  constructor(public readonly data: UpdateDiscountInput) {}
}
