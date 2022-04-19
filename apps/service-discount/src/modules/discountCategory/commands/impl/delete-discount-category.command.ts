import { Id } from '@vg/proto-schema'

export class DeleteDiscountCategoryCommand {
  constructor(public readonly data: Id) {}
}
