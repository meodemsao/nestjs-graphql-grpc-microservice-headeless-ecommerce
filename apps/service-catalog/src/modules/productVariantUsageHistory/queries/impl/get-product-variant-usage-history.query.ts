import { IQuery } from '@nestjs/cqrs'

export class GetProductVariantUsageHistoryQuery implements IQuery {
  constructor(public readonly id: string) {}
}
