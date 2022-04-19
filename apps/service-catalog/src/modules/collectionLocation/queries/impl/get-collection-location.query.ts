import { IQuery } from "@nestjs/cqrs";

export class GetCollectionLocationQuery implements IQuery {
  constructor(public readonly id: string) {
  }
}