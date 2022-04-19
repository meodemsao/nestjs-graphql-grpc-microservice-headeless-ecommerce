import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { ImportPriceHistoryService } from '@vg/service-catalog/modules/importPriceHistory/importPriceHistory.service'
import { ImportPriceHistory } from '@vg/proto-schema'
import { UpdateImportPriceHistoryCommand } from '@vg/service-catalog/modules/importPriceHistory/commands'

@CommandHandler(UpdateImportPriceHistoryCommand)
export class UpdateImportPriceHistoryHandler
  implements ICommandHandler<UpdateImportPriceHistoryCommand>
{
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: ImportPriceHistoryService
  ) {}

  async execute(
    command: UpdateImportPriceHistoryCommand
  ): Promise<ImportPriceHistory> {
    try {
      const result = await this.service.update(
        command.data.id,
        command.data.data
      )

      return result as ImportPriceHistory
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
