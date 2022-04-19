import { CreateTemplateInput } from '@vg/proto-schema'

export class CreateTemplateCommand {
  constructor(
    public readonly request: CreateTemplateInput
  ) {
  }
}
