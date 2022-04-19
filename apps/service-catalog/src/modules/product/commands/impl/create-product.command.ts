import { CreateProductInput } from '@vg/proto-schema'

export class CreateProductCommand {
  constructor(
    public readonly request: CreateProductInput
  ) {
  }
}
