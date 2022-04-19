import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { ProductLocationService } from '@vg/service-catalog/modules/productLocation/productLocation.service'
import { ProductLocation, ProductLocations } from '@vg/proto-schema'
import { GetProductLocationsQuery } from '@vg/service-catalog/modules/productLocation/queries'

@QueryHandler(GetProductLocationsQuery)
export class GetProductLocationsHandler implements IQueryHandler<GetProductLocationsQuery> {
  constructor(private readonly service: ProductLocationService) {
  }

  async execute(data: GetProductLocationsQuery): Promise<ProductLocations> {
    try {

      const result = await this.service.find(
        this.service.fromQueryGrpcToTypeorm(data?.query)
      )

      return {
        productLocations: result as ProductLocation[]
      }
    } catch (e) {
      throw new RpcException(e)
    }
  }
}
