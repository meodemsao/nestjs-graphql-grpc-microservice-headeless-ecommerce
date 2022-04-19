import { Id } from '@vg/proto-schema'

export class DeleteImportPriceHistoryCommand {
  constructor(public readonly data: Id) {}
}
