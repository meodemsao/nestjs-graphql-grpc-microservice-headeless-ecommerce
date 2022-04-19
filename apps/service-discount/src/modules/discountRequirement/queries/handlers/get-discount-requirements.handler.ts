import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { DiscountRequirementService } from '../../discountRequirement.service'
import { DiscountRequirement, DiscountRequirements } from '@vg/proto-schema'
import { GetDiscountRequirementsQuery } from '../index'

@QueryHandler(GetDiscountRequirementsQuery)
export class GetDiscountRequirementsHandler
  implements IQueryHandler<GetDiscountRequirementsQuery>
{
  constructor(private readonly service: DiscountRequirementService) {}

  async execute(
    data: GetDiscountRequirementsQuery
  ): Promise<DiscountRequirements> {
    try {
      const result = await this.service.find(
        this.service.fromQueryGrpcToTypeorm(data?.query)
      )

      return {
        discountRequirements: result as DiscountRequirement[]
      }
    } catch (e) {
      throw new RpcException(e)
    }
  }
}
