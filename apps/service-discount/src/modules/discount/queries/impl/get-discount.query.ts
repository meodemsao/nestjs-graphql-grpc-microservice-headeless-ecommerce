import { IQuery } from '@nestjs/cqrs'

export class GetDiscountQuery implements IQuery {
  constructor(public readonly id: string) {}
}
