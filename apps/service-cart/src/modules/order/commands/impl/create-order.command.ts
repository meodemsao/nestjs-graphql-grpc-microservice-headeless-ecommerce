import { CreateOrderInput } from '@vg/proto-schema'

export class CreateOrderCommand {
  constructor(public readonly request: CreateOrderInput) {}
}
