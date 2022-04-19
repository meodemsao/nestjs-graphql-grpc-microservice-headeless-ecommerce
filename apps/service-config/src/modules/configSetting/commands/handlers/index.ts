import { CreateConfigSettingHandler } from '@vg/service-config/modules/configSetting/commands/handlers/create-config-setting.handler'
import { UpdateConfigSettingHandler } from '@vg/service-config/modules/configSetting/commands/handlers/update-config-setting.handler'
import { DeleteConfigSettingHandler } from '@vg/service-config/modules/configSetting/commands/handlers/delete-config-setting.handler'

export const CommandHandlers = [
  CreateConfigSettingHandler,
  UpdateConfigSettingHandler,
  DeleteConfigSettingHandler
]
