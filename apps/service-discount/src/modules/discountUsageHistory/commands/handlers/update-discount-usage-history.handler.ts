import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { DiscountUsageHistoryService } from '../../discountUsageHistory.service'
import { DiscountUsageHistory } from '@vg/proto-schema'
import { UpdateDiscountUsageHistoryCommand } from '../index'

@CommandHandler(UpdateDiscountUsageHistoryCommand)
export class UpdateDiscountUsageHistoryHandler
  implements ICommandHandler<UpdateDiscountUsageHistoryCommand>
{
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: DiscountUsageHistoryService
  ) {}

  async execute(
    command: UpdateDiscountUsageHistoryCommand
  ): Promise<DiscountUsageHistory> {
    try {
      const result = await this.service.update(
        command.data.id,
        command.data.data
      )

      return result as DiscountUsageHistory
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
