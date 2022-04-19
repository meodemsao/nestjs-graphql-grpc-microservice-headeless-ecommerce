import { IQuery } from "@nestjs/cqrs";

export class GetProductLocationQuery implements IQuery {
  constructor(public readonly id: string) {
  }
}