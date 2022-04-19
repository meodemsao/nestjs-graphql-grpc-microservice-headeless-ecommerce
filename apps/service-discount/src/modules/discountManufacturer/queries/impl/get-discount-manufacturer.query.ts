import { IQuery } from '@nestjs/cqrs'

export class GetDiscountManufacturerQuery implements IQuery {
  constructor(public readonly id: string) {}
}
