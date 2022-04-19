import { CreateProductStoreInput } from '@vg/proto-schema'

export class CreateProductStoreCommand {
  constructor(
    public readonly request: CreateProductStoreInput
  ) {
  }
}
