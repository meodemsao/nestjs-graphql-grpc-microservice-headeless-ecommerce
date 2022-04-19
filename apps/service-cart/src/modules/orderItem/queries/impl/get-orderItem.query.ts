import { IQuery } from '@nestjs/cqrs'

export class GetOrderItemQuery implements IQuery {
  constructor(public readonly id: string) {}
}
