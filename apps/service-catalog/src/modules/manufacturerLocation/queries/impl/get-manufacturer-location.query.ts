import { IQuery } from "@nestjs/cqrs";

export class GetManufacturerLocationQuery implements IQuery {
  constructor(public readonly id: string) {
  }
}