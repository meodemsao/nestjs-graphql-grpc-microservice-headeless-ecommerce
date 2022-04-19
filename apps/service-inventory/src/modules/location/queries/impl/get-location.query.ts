import { IQuery } from '@nestjs/cqrs'

export class GetLocationQuery implements IQuery {
  constructor(public readonly id: string) {}
}
