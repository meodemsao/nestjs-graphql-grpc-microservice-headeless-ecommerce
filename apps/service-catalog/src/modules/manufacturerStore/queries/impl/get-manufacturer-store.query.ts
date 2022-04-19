import { IQuery } from "@nestjs/cqrs";

export class GetManufacturerStoreQuery implements IQuery {
  constructor(public readonly id: string) {
  }
}