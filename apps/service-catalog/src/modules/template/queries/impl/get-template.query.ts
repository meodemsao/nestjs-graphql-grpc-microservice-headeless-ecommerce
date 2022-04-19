import { IQuery } from "@nestjs/cqrs";

export class GetTemplateQuery implements IQuery {
  constructor(public readonly id: string) {
  }
}