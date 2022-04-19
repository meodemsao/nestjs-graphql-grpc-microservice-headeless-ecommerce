import { IQuery } from '@nestjs/cqrs'

export class GetImportPriceHistoryQuery implements IQuery {
  constructor(public readonly id: string) {}
}
