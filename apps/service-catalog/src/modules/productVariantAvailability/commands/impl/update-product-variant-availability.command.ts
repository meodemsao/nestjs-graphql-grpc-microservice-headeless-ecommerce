import { UpdateProductVariantAvailabilityInput } from '@vg/proto-schema'

export class UpdateProductVariantAvailabilityCommand {
  constructor(public readonly data: UpdateProductVariantAvailabilityInput) {}
}
