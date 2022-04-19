import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Count } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { ImportPriceHistoryService } from '@vg/service-catalog/modules/importPriceHistory/importPriceHistory.service'
import { GetImportPriceHistoriesTotalQuery } from '@vg/service-catalog/modules/importPriceHistory/queries'

@QueryHandler(GetImportPriceHistoriesTotalQuery)
export class GetImportPriceHistoriesTotalHandler
  implements IQueryHandler<GetImportPriceHistoriesTotalQuery>
{
  constructor(private readonly service: ImportPriceHistoryService) {}

  async execute(data: GetImportPriceHistoriesTotalQuery): Promise<Count> {
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
