import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { ProductVariantUsageHistory } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { CreateProductVariantUsageHistoryCommand } from '@vg/service-catalog/modules/productVariantUsageHistory/commands'
import { ProductVariantUsageHistoryService } from '@vg/service-catalog/modules/productVariantUsageHistory/productVariantUsageHistory.service'

@CommandHandler(CreateProductVariantUsageHistoryCommand)
export class CreateProductVariantUsageHistoryHandler
  implements ICommandHandler<CreateProductVariantUsageHistoryCommand>
{
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: ProductVariantUsageHistoryService
  ) {}

  async execute(
    command: CreateProductVariantUsageHistoryCommand
  ): Promise<ProductVariantUsageHistory> {
    this.logger.log(`execute create product variant usage history command`)
    try {
      const result = await this.service.create(command.request.data)
      return result as ProductVariantUsageHistory
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
