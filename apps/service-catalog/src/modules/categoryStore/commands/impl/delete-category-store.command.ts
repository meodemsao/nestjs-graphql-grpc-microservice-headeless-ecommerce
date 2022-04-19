import { Id } from '@vg/proto-schema'

export class DeleteCategoryStoreCommand {
  constructor(public readonly data: Id) {
  }
}