import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { ProductCategory } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { CreateProductCategoryCommand } from '@vg/service-catalog/modules/productCategory/commands'
import { ProductCategoryService } from '@vg/service-catalog/modules/productCategory/productCategory.service'

@CommandHandler(CreateProductCategoryCommand)
export class CreateProductCategoryHandler implements ICommandHandler<CreateProductCategoryCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: ProductCategoryService
  ) {
  }

  async execute(command: CreateProductCategoryCommand): Promise<ProductCategory> {
    this.logger.log(`execute create catalog command`)
    try {
      const result = await this.service.create(command.request.data)
      return result as ProductCategory
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
