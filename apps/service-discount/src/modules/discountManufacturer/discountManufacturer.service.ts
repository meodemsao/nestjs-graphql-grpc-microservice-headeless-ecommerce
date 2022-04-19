import { BaseService } from '@vg/repository/services/base.service'
import { Injectable } from '@nestjs/common'
import { DiscountManufacturerEntity } from '@vg/repository/entities'
import { DiscountManufacturerRepository } from '@vg/repository/repositories'

@Injectable()
export class DiscountManufacturerService extends BaseService<
  DiscountManufacturerEntity,
  DiscountManufacturerRepository
> {
  constructor(repository: DiscountManufacturerRepository) {
    super(repository)
  }
}
