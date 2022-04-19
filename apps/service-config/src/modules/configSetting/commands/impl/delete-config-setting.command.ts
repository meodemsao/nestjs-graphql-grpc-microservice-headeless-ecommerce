import { Id } from '@vg/proto-schema'

export class DeleteConfigSettingCommand {
  constructor(public readonly data: Id) {}
}
