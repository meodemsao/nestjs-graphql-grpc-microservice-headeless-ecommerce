import { CreateProductImageInput } from '@vg/proto-schema'

export class CreateProductImageCommand {
  constructor(
    public readonly request: CreateProductImageInput
  ) {
  }
}
