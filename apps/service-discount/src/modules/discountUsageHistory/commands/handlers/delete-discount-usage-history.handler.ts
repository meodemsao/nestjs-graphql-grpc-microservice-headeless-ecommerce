import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { DiscountUsageHistory } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { DeleteDiscountUsageHistoryCommand } from '../index'
import { DiscountUsageHistoryService } from '../../discountUsageHistory.service'

@CommandHandler(DeleteDiscountUsageHistoryCommand)
export class DeleteDiscountUsageHistoryHandler
  implements ICommandHandler<DeleteDiscountUsageHistoryCommand>
{
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: DiscountUsageHistoryService
  ) {}

  async execute(
    command: DeleteDiscountUsageHistoryCommand
  ): Promise<DiscountUsageHistory> {
    try {
      const result = await this.service.delete(command.data.id)

      return result as DiscountUsageHistory
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
