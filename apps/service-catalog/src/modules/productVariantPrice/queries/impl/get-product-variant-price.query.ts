import { IQuery } from '@nestjs/cqrs'

export class GetProductVariantPriceQuery implements IQuery {
  constructor(public readonly id: string) {}
}
