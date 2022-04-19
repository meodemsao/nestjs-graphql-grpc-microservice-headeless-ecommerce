import { IQuery } from '@nestjs/cqrs'

export class GetProductVariantAttributeQuery implements IQuery {
  constructor(public readonly id: string) {}
}
