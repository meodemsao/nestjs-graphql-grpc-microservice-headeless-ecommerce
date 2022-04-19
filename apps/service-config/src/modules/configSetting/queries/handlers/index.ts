import { GetConfigSettingHandler } from '@vg/service-config/modules/configSetting/queries/handlers/get-config-setting.handler'
import { GetConfigSettingsHandler } from '@vg/service-config/modules/configSetting/queries/handlers/get-config-settings.handler'
import { GetConfigSettingsTotalHandler } from '@vg/service-config/modules/configSetting/queries/handlers/get-config-settings-total.handler'

export const QueryHandlers = [
  GetConfigSettingHandler,
  GetConfigSettingsHandler,
  GetConfigSettingsTotalHandler
]
