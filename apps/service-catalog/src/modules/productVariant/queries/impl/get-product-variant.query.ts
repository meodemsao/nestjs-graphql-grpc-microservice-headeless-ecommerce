import { IQuery } from '@nestjs/cqrs'

export class GetProductVariantQuery implements IQuery {
  constructor(public readonly id: string) {}
}
