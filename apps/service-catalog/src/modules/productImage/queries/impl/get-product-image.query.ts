import { IQuery } from "@nestjs/cqrs";

export class GetProductImageQuery implements IQuery {
  constructor(public readonly id: string) {
  }
}