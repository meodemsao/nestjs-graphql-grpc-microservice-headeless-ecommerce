import { IQuery } from '@nestjs/cqrs'

export class GetAttributeQuery implements IQuery {
  constructor(public readonly id: string) {}
}
