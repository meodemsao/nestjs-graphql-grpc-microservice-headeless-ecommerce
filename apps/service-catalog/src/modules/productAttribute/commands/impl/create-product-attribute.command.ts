import { CreateProductAttributeInput } from '@vg/proto-schema'

export class CreateProductAttributeCommand {
  constructor(
    public readonly request: CreateProductAttributeInput
  ) {
  }
}
