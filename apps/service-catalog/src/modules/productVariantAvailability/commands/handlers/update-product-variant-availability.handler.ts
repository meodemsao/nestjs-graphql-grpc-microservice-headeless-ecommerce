import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { ProductVariantAvailabilityService } from '@vg/service-catalog/modules/productVariantAvailability/productVariantAvailability.service'
import { ProductVariantAvailability } from '@vg/proto-schema'
import { UpdateProductVariantAvailabilityCommand } from '@vg/service-catalog/modules/productVariantAvailability/commands'

@CommandHandler(UpdateProductVariantAvailabilityCommand)
export class UpdateProductVariantAvailabilityHandler
  implements ICommandHandler<UpdateProductVariantAvailabilityCommand>
{
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: ProductVariantAvailabilityService
  ) {}

  async execute(
    command: UpdateProductVariantAvailabilityCommand
  ): Promise<ProductVariantAvailability> {
    try {
      const result = await this.service.update(
        command.data.id,
        command.data.data
      )

      return result as ProductVariantAvailability
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
