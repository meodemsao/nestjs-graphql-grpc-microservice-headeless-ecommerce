import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { DiscountProductService } from '../../discountProduct.service'
import { DiscountProduct, NullableDiscountProduct } from '@vg/proto-schema'
import { GetDiscountProductQuery } from '../index'

@QueryHandler(GetDiscountProductQuery)
export class GetDiscountProductHandler
  implements IQueryHandler<GetDiscountProductQuery>
{
  constructor(private readonly service: DiscountProductService) {}

  async execute(
    query: GetDiscountProductQuery
  ): Promise<NullableDiscountProduct> {
    try {
      const result = await this.service.findById(query.id)

      return {
        data: result as DiscountProduct,
        null: result ? 0 : undefined
      }
    } catch (e) {
      console.log('e..........', e)
      throw new RpcException(e)
    }
  }
}
