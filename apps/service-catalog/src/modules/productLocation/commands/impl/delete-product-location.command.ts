import { Id } from '@vg/proto-schema'

export class DeleteProductLocationCommand {
  constructor(public readonly data: Id) {
  }
}