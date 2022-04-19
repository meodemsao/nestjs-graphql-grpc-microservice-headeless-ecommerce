import { IQuery } from "@nestjs/cqrs";

export class GetCategoryStoreQuery implements IQuery {
  constructor(public readonly id: string) {
  }
}