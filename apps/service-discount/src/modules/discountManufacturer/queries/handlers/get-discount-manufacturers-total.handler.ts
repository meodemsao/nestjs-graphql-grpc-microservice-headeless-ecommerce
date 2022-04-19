import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Count } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { DiscountManufacturerService } from '../../discountManufacturer.service'
import { GetDiscountManufacturersTotalQuery } from '../index'

@QueryHandler(GetDiscountManufacturersTotalQuery)
export class GetDiscountManufacturersTotalHandler
  implements IQueryHandler<GetDiscountManufacturersTotalQuery>
{
  constructor(private readonly service: DiscountManufacturerService) {}

  async execute(data: GetDiscountManufacturersTotalQuery): Promise<Count> {
    try {
      const result = await this.service.count(
        this.service.fromQueryGrpcToTypeorm(data?.query).filter
      )

      return {
        totalCount: result
      }
    } catch (e) {
      throw new RpcException(e)
    }
  }
}
