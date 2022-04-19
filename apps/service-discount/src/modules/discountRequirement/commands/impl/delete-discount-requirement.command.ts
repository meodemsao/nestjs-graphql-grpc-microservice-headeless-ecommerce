import { Id } from '@vg/proto-schema'

export class DeleteDiscountRequirementCommand {
  constructor(public readonly data: Id) {}
}
