import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { MetaTagController } from './metaTag.controller'
import { MetaTagRepository } from '@vg/repository/repositories'

import { MetaTagService } from '@vg/service-catalog/modules/metaTag/metaTag.service'
import { CommandHandlers } from '@vg/service-catalog/modules/metaTag/commands'
import { QueryHandlers } from '@vg/service-catalog/modules/metaTag/queries'

@Module({
  imports: [TypeOrmModule.forFeature([MetaTagRepository])],
  controllers: [MetaTagController],
  providers: [MetaTagService, ...CommandHandlers, ...QueryHandlers]
})
export class MetaTagModule {}
