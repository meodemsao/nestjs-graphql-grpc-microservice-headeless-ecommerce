import { CreateDiscountRequirementInput } from '@vg/proto-schema'

export class CreateDiscountRequirementCommand {
  constructor(public readonly request: CreateDiscountRequirementInput) {}
}
