import { IQuery } from '@nestjs/cqrs'

export class GetDiscountProductQuery implements IQuery {
  constructor(public readonly id: string) {}
}
