import { IQuery } from "@nestjs/cqrs";

export class GetProductStoreQuery implements IQuery {
  constructor(public readonly id: string) {
  }
}