import { Id } from '@vg/proto-schema'

export class DeleteProductImageCommand {
  constructor(public readonly data: Id) {
  }
}