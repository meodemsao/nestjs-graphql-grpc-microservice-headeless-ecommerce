import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { ProductVariantUsageHistoryService } from '@vg/service-catalog/modules/productVariantUsageHistory/productVariantUsageHistory.service'
import { ProductVariantUsageHistory } from '@vg/proto-schema'
import { UpdateProductVariantUsageHistoryCommand } from '@vg/service-catalog/modules/productVariantUsageHistory/commands'

@CommandHandler(UpdateProductVariantUsageHistoryCommand)
export class UpdateProductVariantUsageHistoryHandler
  implements ICommandHandler<UpdateProductVariantUsageHistoryCommand>
{
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: ProductVariantUsageHistoryService
  ) {}

  async execute(
    command: UpdateProductVariantUsageHistoryCommand
  ): Promise<ProductVariantUsageHistory> {
    try {
      const result = await this.service.update(
        command.data.id,
        command.data.data
      )

      return result as ProductVariantUsageHistory
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
