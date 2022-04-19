import { UpdateProductInput } from '@vg/proto-schema'

export class UpdateProductCommand {
  constructor(public readonly data: UpdateProductInput) {
  }
}