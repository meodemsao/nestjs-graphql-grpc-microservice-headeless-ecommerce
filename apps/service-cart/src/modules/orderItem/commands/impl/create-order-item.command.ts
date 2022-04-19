import { CreateOrderItemInput } from '@vg/proto-schema'

export class CreateOrderItemCommand {
  constructor(public readonly request: CreateOrderItemInput) {}
}
