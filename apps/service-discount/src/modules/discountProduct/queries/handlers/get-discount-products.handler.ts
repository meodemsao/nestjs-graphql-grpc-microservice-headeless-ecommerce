import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { DiscountProductService } from '../../discountProduct.service'
import { DiscountProduct, DiscountProducts } from '@vg/proto-schema'
import { GetDiscountProductsQuery } from '../index'

@QueryHandler(GetDiscountProductsQuery)
export class GetDiscountProductsHandler
  implements IQueryHandler<GetDiscountProductsQuery>
{
  constructor(private readonly service: DiscountProductService) {}

  async execute(data: GetDiscountProductsQuery): Promise<DiscountProducts> {
    try {
      const result = await this.service.find(
        this.service.fromQueryGrpcToTypeorm(data?.query)
      )

      return {
        discountProducts: result as DiscountProduct[]
      }
    } catch (e) {
      throw new RpcException(e)
    }
  }
}
