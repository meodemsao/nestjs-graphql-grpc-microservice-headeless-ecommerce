import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { DiscountRequirementService } from '../../discountRequirement.service'
import {
  DiscountRequirement,
  NullableDiscountRequirement
} from '@vg/proto-schema'
import { GetDiscountRequirementQuery } from '../index'

@QueryHandler(GetDiscountRequirementQuery)
export class GetDiscountRequirementHandler
  implements IQueryHandler<GetDiscountRequirementQuery>
{
  constructor(private readonly service: DiscountRequirementService) {}

  async execute(
    query: GetDiscountRequirementQuery
  ): Promise<NullableDiscountRequirement> {
    try {
      const result = await this.service.findById(query.id)

      return {
        data: result as DiscountRequirement,
        null: result ? 0 : undefined
      }
    } catch (e) {
      console.log('e..........', e)
      throw new RpcException(e)
    }
  }
}
