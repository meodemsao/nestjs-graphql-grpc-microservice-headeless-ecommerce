import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Count } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { DiscountRequirementService } from '../../discountRequirement.service'
import { GetDiscountRequirementsTotalQuery } from '../index'

@QueryHandler(GetDiscountRequirementsTotalQuery)
export class GetDiscountRequirementsTotalHandler
  implements IQueryHandler<GetDiscountRequirementsTotalQuery>
{
  constructor(private readonly service: DiscountRequirementService) {}

  async execute(data: GetDiscountRequirementsTotalQuery): Promise<Count> {
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
