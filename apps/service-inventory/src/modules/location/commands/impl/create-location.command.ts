import { CreateLocationInput } from '@vg/proto-schema'

export class CreateLocationCommand {
  constructor(public readonly request: CreateLocationInput) {}
}
