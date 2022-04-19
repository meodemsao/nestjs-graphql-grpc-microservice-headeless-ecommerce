import { UpdateDiscountRequirementInput } from '@vg/proto-schema'

export class UpdateDiscountRequirementCommand {
  constructor(public readonly data: UpdateDiscountRequirementInput) {}
}
