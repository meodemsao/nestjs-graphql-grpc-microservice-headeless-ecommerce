import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { DiscountManufacturerService } from '../../discountManufacturer.service'
import { DiscountManufacturer, DiscountManufacturers } from '@vg/proto-schema'
import { GetDiscountManufacturersQuery } from '../index'

@QueryHandler(GetDiscountManufacturersQuery)
export class GetDiscountManufacturersHandler
  implements IQueryHandler<GetDiscountManufacturersQuery>
{
  constructor(private readonly service: DiscountManufacturerService) {}

  async execute(
    data: GetDiscountManufacturersQuery
  ): Promise<DiscountManufacturers> {
    try {
      const result = await this.service.find(
        this.service.fromQueryGrpcToTypeorm(data?.query)
      )

      return {
        discountManufacturers: result as DiscountManufacturer[]
      }
    } catch (e) {
      throw new RpcException(e)
    }
  }
}
