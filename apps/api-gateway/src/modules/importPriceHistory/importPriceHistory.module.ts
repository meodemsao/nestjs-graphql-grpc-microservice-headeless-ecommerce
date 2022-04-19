import { Module } from '@nestjs/common'
import { NestjsQueryGraphQLModule } from '@vg/query-graphql'

import { ImportPriceHistoryInputType } from '@vg/api-gateway/modules/importPriceHistory/dto/importPriceHistory.args'
import { ImportPriceHistoryResolver } from '@vg/api-gateway/modules/importPriceHistory/importPriceHistory.resolver'
import { ImportPriceHistoryDto } from '@vg/api-gateway/modules/importPriceHistory/dto/importPriceHistory.dto'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      resolvers: [
        {
          DTOClass: ImportPriceHistoryDto,
          CreateDTOClass: ImportPriceHistoryInputType,
          UpdateDTOClass: ImportPriceHistoryInputType
        }
      ]
    })
  ],
  providers: [ImportPriceHistoryResolver]
})
export class ImportPriceHistoryModule {}
