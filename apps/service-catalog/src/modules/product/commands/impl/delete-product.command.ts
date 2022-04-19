import { Id } from '@vg/proto-schema'

export class DeleteProductCommand {
  constructor(public readonly data: Id) {
  }
}