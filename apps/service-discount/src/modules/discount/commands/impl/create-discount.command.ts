import { CreateDiscountInput } from '@vg/proto-schema'

export class CreateDiscountCommand {
  constructor(public readonly request: CreateDiscountInput) {}
}
