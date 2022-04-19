import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { ImportPriceHistoryService } from '@vg/service-catalog/modules/importPriceHistory/importPriceHistory.service'
import {
  ImportPriceHistory,
  NullableImportPriceHistory
} from '@vg/proto-schema'
import { GetImportPriceHistoryQuery } from '@vg/service-catalog/modules/importPriceHistory/queries'

@QueryHandler(GetImportPriceHistoryQuery)
export class GetImportPriceHistoryHandler
  implements IQueryHandler<GetImportPriceHistoryQuery>
{
  constructor(private readonly service: ImportPriceHistoryService) {}

  async execute(
    query: GetImportPriceHistoryQuery
  ): Promise<NullableImportPriceHistory> {
    try {
      const result = await this.service.findById(query.id)

      return {
        data: result as ImportPriceHistory,
        null: result ? 0 : undefined
      }
    } catch (e) {
      console.log('e..........', e)
      throw new RpcException(e)
    }
  }
}
