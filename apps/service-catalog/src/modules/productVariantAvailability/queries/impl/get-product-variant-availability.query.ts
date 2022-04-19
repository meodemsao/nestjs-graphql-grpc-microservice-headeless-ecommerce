import { IQuery } from '@nestjs/cqrs'

export class GetProductVariantAvailabilityQuery implements IQuery {
  constructor(public readonly id: string) {}
}
