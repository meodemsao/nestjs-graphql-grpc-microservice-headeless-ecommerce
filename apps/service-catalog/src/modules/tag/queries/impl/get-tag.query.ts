import { IQuery } from "@nestjs/cqrs";

export class GetTagQuery implements IQuery {
  constructor(public readonly id: string) {
  }
}