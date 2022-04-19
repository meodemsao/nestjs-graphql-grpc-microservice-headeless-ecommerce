import { CreateDiscountCategoryInput } from '@vg/proto-schema'

export class CreateDiscountCategoryCommand {
  constructor(public readonly request: CreateDiscountCategoryInput) {}
}
