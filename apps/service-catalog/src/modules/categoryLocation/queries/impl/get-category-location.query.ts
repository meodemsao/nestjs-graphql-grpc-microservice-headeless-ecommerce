import { IQuery } from "@nestjs/cqrs";

export class GetCategoryLocationQuery implements IQuery {
  constructor(public readonly id: string) {
  }
}