import { BaseService } from '@vg/repository/services/base.service'
import { Injectable } from '@nestjs/common'
import { ConfigSettingEntity } from '@vg/repository/entities'
import { ConfigSettingRepository } from '@vg/repository/repositories'

@Injectable()
export class ConfigSettingService extends BaseService<ConfigSettingEntity, ConfigSettingRepository> {
  constructor(repository: ConfigSettingRepository) {
    super(repository)
  }
}
