import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { ProductVariantAvailability } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { DeleteProductVariantAvailabilityCommand } from '@vg/service-catalog/modules/productVariantAvailability/commands'
import { ProductVariantAvailabilityService } from '@vg/service-catalog/modules/productVariantAvailability/productVariantAvailability.service'

@CommandHandler(DeleteProductVariantAvailabilityCommand)
export class DeleteProductVariantAvailabilityHandler
  implements ICommandHandler<DeleteProductVariantAvailabilityCommand>
{
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: ProductVariantAvailabilityService
  ) {}

  async execute(
    command: DeleteProductVariantAvailabilityCommand
  ): Promise<ProductVariantAvailability> {
    try {
      const result = await this.service.delete(command.data.id)

      return result as ProductVariantAvailability
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
