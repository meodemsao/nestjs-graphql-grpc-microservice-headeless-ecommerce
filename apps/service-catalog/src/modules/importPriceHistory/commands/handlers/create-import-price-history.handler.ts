import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { ImportPriceHistory } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { CreateImportPriceHistoryCommand } from '@vg/service-catalog/modules/importPriceHistory/commands'
import { ImportPriceHistoryService } from '@vg/service-catalog/modules/importPriceHistory/importPriceHistory.service'

@CommandHandler(CreateImportPriceHistoryCommand)
export class CreateImportPriceHistoryHandler
  implements ICommandHandler<CreateImportPriceHistoryCommand>
{
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: ImportPriceHistoryService
  ) {}

  async execute(
    command: CreateImportPriceHistoryCommand
  ): Promise<ImportPriceHistory> {
    this.logger.log(`execute create importPriceHistory command`)
    try {
      const result = await this.service.create(command.request.data)
      return result as ImportPriceHistory
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
