import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { ProductVariantAvailability } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { CreateProductVariantAvailabilityCommand } from '@vg/service-catalog/modules/productVariantAvailability/commands'
import { ProductVariantAvailabilityService } from '@vg/service-catalog/modules/productVariantAvailability/productVariantAvailability.service'

@CommandHandler(CreateProductVariantAvailabilityCommand)
export class CreateProductVariantAvailabilityHandler
  implements ICommandHandler<CreateProductVariantAvailabilityCommand>
{
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: ProductVariantAvailabilityService
  ) {}

  async execute(
    command: CreateProductVariantAvailabilityCommand
  ): Promise<ProductVariantAvailability> {
    this.logger.log(`execute create product variant availability command`)
    try {
      const result = await this.service.create(command.request.data)
      return result as ProductVariantAvailability
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
