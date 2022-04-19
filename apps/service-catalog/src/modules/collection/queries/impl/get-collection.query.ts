import { IQuery } from "@nestjs/cqrs";

export class GetCollectionQuery implements IQuery {
  constructor(public readonly id: string) {
  }
}