import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { ProductVariantUsageHistory } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { DeleteProductVariantUsageHistoryCommand } from '@vg/service-catalog/modules/productVariantUsageHistory/commands'
import { ProductVariantUsageHistoryService } from '@vg/service-catalog/modules/productVariantUsageHistory/productVariantUsageHistory.service'

@CommandHandler(DeleteProductVariantUsageHistoryCommand)
export class DeleteProductVariantUsageHistoryHandler
  implements ICommandHandler<DeleteProductVariantUsageHistoryCommand>
{
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: ProductVariantUsageHistoryService
  ) {}

  async execute(
    command: DeleteProductVariantUsageHistoryCommand
  ): Promise<ProductVariantUsageHistory> {
    try {
      const result = await this.service.delete(command.data.id)

      return result as ProductVariantUsageHistory
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
