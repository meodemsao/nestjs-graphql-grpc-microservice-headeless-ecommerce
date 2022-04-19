import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { ImportPriceHistoryService } from '@vg/service-catalog/modules/importPriceHistory/importPriceHistory.service'
import { ImportPriceHistory, ImportPriceHistories } from '@vg/proto-schema'
import { GetImportPriceHistoriesQuery } from '@vg/service-catalog/modules/importPriceHistory/queries'

@QueryHandler(GetImportPriceHistoriesQuery)
export class GetImportPriceHistoriesHandler
  implements IQueryHandler<GetImportPriceHistoriesQuery>
{
  constructor(private readonly service: ImportPriceHistoryService) {}

  async execute(
    data: GetImportPriceHistoriesQuery
  ): Promise<ImportPriceHistories> {
    try {
      const result = await this.service.find(
        this.service.fromQueryGrpcToTypeorm(data?.query)
      )

      return {
        importPriceHistories: result as ImportPriceHistory[]
      }
    } catch (e) {
      throw new RpcException(e)
    }
  }
}
