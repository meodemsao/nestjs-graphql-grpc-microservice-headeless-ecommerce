import { IQuery } from '@nestjs/cqrs'
import { Query } from '@vg/proto-schema'

export class GetAttributeOptionsQuery implements IQuery {
  constructor(public readonly query?: Query) {}
}
