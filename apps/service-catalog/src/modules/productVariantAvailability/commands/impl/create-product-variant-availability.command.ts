import { CreateProductVariantAvailabilityInput } from '@vg/proto-schema'

export class CreateProductVariantAvailabilityCommand {
  constructor(public readonly request: CreateProductVariantAvailabilityInput) {}
}
