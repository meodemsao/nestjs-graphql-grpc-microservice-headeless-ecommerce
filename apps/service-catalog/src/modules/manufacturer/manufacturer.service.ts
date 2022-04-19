import { BaseService } from '@vg/repository/services/base.service'
import { Injectable } from '@nestjs/common'
import { ManufacturerEntity } from '@vg/repository/entities'
import { ManufacturerRepository } from '@vg/repository/repositories'

@Injectable()
export class ManufacturerService extends BaseService<ManufacturerEntity, ManufacturerRepository> {
  constructor(repository: ManufacturerRepository) {
    super(repository)
  }
}
