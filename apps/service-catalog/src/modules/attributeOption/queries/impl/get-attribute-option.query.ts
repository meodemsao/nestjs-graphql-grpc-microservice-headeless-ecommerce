import { IQuery } from '@nestjs/cqrs'

export class GetAttributeOptionQuery implements IQuery {
  constructor(public readonly id: string) {}
}
