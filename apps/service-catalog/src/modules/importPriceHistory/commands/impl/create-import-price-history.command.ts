import { CreateImportPriceHistoryInput } from '@vg/proto-schema'

export class CreateImportPriceHistoryCommand {
  constructor(public readonly request: CreateImportPriceHistoryInput) {}
}
