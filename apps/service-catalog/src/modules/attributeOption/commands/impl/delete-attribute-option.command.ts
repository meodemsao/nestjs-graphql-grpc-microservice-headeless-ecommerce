import { Id } from '@vg/proto-schema'

export class DeleteAttributeOptionCommand {
  constructor(public readonly data: Id) {}
}
