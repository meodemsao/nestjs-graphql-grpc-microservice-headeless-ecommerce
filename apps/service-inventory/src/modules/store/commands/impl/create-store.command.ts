import { CreateStoreInput } from '@vg/proto-schema'

export class CreateStoreCommand {
  constructor(public readonly request: CreateStoreInput) {}
}
