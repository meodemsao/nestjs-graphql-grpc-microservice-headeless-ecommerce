import { CreateConfigSettingInput } from '@vg/proto-schema'

export class CreateConfigSettingCommand {
  constructor(public readonly request: CreateConfigSettingInput) {}
}
