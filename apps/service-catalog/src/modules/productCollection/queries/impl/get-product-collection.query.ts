import { IQuery } from "@nestjs/cqrs";

export class GetProductCollectionQuery implements IQuery {
  constructor(public readonly id: string) {
  }
}