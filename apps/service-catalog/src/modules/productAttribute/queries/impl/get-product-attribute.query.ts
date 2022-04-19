import { IQuery } from "@nestjs/cqrs";

export class GetProductAttributeQuery implements IQuery {
  constructor(public readonly id: string) {
  }
}