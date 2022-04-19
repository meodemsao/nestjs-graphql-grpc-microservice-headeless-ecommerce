import { IQuery } from "@nestjs/cqrs";

export class GetProductCategoryQuery implements IQuery {
  constructor(public readonly id: string) {
  }
}