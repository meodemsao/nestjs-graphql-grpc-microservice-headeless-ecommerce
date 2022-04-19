import { IQuery } from '@nestjs/cqrs'

export class GetMetaTagQuery implements IQuery {
  constructor(public readonly id: string) {}
}
