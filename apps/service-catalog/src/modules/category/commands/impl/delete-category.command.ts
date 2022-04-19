import { Id } from '@vg/proto-schema'

export class DeleteCategoryCommand {
  constructor(public readonly data: Id) {
  }
}