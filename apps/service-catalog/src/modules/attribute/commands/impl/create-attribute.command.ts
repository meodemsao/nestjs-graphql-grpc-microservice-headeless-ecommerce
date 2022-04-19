import { CreateAttributeInput } from '@vg/proto-schema'

export class CreateAttributeCommand {
  constructor(public readonly request: CreateAttributeInput) {}
}
