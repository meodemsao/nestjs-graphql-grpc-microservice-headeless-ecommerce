import { UpdateDiscountProductInput } from '@vg/proto-schema'

export class UpdateDiscountProductCommand {
  constructor(public readonly data: UpdateDiscountProductInput) {}
}
