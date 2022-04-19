import { Id } from '@vg/proto-schema'

export class DeleteTemplateCommand {
  constructor(public readonly data: Id) {
  }
}