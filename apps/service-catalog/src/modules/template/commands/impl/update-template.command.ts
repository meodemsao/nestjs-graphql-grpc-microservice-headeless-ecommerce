import { UpdateTemplateInput } from '@vg/proto-schema'

export class UpdateTemplateCommand {
  constructor(public readonly data: UpdateTemplateInput) {
  }
}