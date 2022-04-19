import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { ImportPriceHistory } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { DeleteImportPriceHistoryCommand } from '@vg/service-catalog/modules/importPriceHistory/commands'
import { ImportPriceHistoryService } from '@vg/service-catalog/modules/importPriceHistory/importPriceHistory.service'

@CommandHandler(DeleteImportPriceHistoryCommand)
export class DeleteImportPriceHistoryHandler
  implements ICommandHandler<DeleteImportPriceHistoryCommand>
{
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: ImportPriceHistoryService
  ) {}

  async execute(
    command: DeleteImportPriceHistoryCommand
  ): Promise<ImportPriceHistory> {
    try {
      const result = await this.service.delete(command.data.id)

      return result as ImportPriceHistory
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
