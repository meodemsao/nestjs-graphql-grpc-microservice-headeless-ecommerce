import { IQuery } from '@nestjs/cqrs'

export class GetDiscountUsageHistoryQuery implements IQuery {
  constructor(public readonly id: string) {}
}
