import { CreateDiscountManufacturerInput } from '@vg/proto-schema'

export class CreateDiscountManufacturerCommand {
  constructor(public readonly request: CreateDiscountManufacturerInput) {}
}
