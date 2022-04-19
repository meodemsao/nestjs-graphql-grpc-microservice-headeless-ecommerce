import { Id } from '@vg/proto-schema'

export class DeleteAttributeCommand {
  constructor(public readonly data: Id) {}
}
