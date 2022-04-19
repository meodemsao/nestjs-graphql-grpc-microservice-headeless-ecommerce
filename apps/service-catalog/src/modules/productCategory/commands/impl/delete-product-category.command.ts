import { Id } from '@vg/proto-schema'

export class DeleteProductCategoryCommand {
  constructor(public readonly data: Id) {
  }
}