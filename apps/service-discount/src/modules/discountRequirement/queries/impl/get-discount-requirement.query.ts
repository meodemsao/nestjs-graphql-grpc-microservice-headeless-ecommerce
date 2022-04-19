import { IQuery } from '@nestjs/cqrs'

export class GetDiscountRequirementQuery implements IQuery {
  constructor(public readonly id: string) {}
}
