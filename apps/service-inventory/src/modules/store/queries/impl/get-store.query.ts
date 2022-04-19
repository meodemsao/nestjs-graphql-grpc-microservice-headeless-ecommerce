import { IQuery } from '@nestjs/cqrs'

export class GetStoreQuery implements IQuery {
  constructor(public readonly id: string) {}
}
