import { UpdateImportPriceHistoryInput } from '@vg/proto-schema'

export class UpdateImportPriceHistoryCommand {
  constructor(public readonly data: UpdateImportPriceHistoryInput) {}
}
