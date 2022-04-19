import { CreateProductLocationInput } from '@vg/proto-schema'

export class CreateProductLocationCommand {
  constructor(
    public readonly request: CreateProductLocationInput
  ) {
  }
}
