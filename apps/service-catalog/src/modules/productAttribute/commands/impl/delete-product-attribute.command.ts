import { Id } from '@vg/proto-schema'

export class DeleteProductAttributeCommand {
  constructor(public readonly data: Id) {
  }
}