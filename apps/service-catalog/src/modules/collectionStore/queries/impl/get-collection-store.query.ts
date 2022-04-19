import { IQuery } from "@nestjs/cqrs";

export class GetCollectionStoreQuery implements IQuery {
  constructor(public readonly id: string) {
  }
}