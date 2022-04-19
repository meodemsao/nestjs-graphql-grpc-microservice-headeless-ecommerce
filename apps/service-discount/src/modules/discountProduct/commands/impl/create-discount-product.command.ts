import { CreateDiscountProductInput } from '@vg/proto-schema'

export class CreateDiscountProductCommand {
  constructor(public readonly request: CreateDiscountProductInput) {}
}
