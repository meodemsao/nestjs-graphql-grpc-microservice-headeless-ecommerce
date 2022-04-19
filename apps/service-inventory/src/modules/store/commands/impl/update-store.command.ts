import { UpdateStoreInput } from '@vg/proto-schema'

export class UpdateStoreCommand {
  constructor(public readonly data: UpdateStoreInput) {}
}
