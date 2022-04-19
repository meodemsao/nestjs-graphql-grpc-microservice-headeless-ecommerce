import { CreateAttributeOptionInput } from '@vg/proto-schema'

export class CreateAttributeOptionCommand {
  constructor(public readonly request: CreateAttributeOptionInput) {}
}
