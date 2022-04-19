import { IQuery } from '@nestjs/cqrs'

export class GetDiscountCategoryQuery implements IQuery {
  constructor(public readonly id: string) {}
}
