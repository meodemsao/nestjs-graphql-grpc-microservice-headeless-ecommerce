import { UpdateConfigSettingInput } from '@vg/proto-schema'

export class UpdateConfigSettingCommand {
  constructor(public readonly data: UpdateConfigSettingInput) {}
}
