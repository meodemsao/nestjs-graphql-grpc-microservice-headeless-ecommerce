import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { TagController } from './tag.controller'
import { TagRepository } from '@vg/repository/repositories'

import { TagService } from '@vg/service-catalog/modules/tag/tag.service'
import { CommandHandlers } from '@vg/service-catalog/modules/tag/commands'
import { QueryHandlers } from '@vg/service-catalog/modules/tag/queries'

@Module({
  imports: [
    TypeOrmModule.forFeature([TagRepository])
  ],
  controllers: [TagController],
  providers: [
    TagService,
    ...CommandHandlers,
    ...QueryHandlers
  ]
})

export class TagModule {
}
