import { EntityRepository, Repository } from 'typeorm'
import { ConfigSettingEntity } from '@vg/repository/entities'

@EntityRepository(ConfigSettingEntity)
export class ConfigSettingRepository extends Repository<ConfigSettingEntity> {}
