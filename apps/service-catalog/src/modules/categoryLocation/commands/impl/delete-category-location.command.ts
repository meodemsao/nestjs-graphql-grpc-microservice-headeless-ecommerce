import { Id } from '@vg/proto-schema'

export class DeleteCategoryLocationCommand {
  constructor(public readonly data: Id) {
  }
}