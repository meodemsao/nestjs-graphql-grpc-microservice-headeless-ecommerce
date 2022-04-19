import { BaseService } from '@vg/repository/services/base.service'
import { Injectable } from '@nestjs/common'
import { ManufacturerLocationEntity } from '@vg/repository/entities'
import { ManufacturerLocationRepository } from '@vg/repository/repositories'

@Injectable()
export class ManufacturerLocationService extends BaseService<ManufacturerLocationEntity, ManufacturerLocationRepository> {
  constructor(repository: ManufacturerLocationRepository) {
    super(repository)
  }
}
