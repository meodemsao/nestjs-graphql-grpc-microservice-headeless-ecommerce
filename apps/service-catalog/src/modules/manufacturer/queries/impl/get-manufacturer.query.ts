import { IQuery } from "@nestjs/cqrs";

export class GetManufacturerQuery implements IQuery {
  constructor(public readonly id: string) {
  }
}