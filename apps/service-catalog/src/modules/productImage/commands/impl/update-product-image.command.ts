import { UpdateProductImageInput } from '@vg/proto-schema'

export class UpdateProductImageCommand {
  constructor(public readonly data: UpdateProductImageInput) {
  }
}