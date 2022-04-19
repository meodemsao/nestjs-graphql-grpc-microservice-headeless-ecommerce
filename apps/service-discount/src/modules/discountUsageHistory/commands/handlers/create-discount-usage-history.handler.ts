import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { DiscountUsageHistory } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { CreateDiscountUsageHistoryCommand } from '../index'
import { DiscountUsageHistoryService } from '../../discountUsageHistory.service'

@CommandHandler(CreateDiscountUsageHistoryCommand)
export class CreateDiscountUsageHistoryHandler
  implements ICommandHandler<CreateDiscountUsageHistoryCommand>
{
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: DiscountUsageHistoryService
  ) {}

  async execute(
    command: CreateDiscountUsageHistoryCommand
  ): Promise<DiscountUsageHistory> {
    this.logger.log(`execute create discountUsageHistory command`)
    try {
      const result = await this.service.create(command.request.data)
      return result as DiscountUsageHistory
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
