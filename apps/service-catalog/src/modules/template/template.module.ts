import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { TemplateController } from './template.controller'
import { TemplateRepository } from '@vg/repository/repositories'

import { TemplateService } from '@vg/service-catalog/modules/template/template.service'
import { CommandHandlers } from '@vg/service-catalog/modules/template/commands'
import { QueryHandlers } from '@vg/service-catalog/modules/template/queries'

@Module({
  imports: [
    TypeOrmModule.forFeature([TemplateRepository])
  ],
  controllers: [TemplateController],
  providers: [
    TemplateService,
    ...CommandHandlers,
    ...QueryHandlers
  ]
})

export class TemplateModule {
}
