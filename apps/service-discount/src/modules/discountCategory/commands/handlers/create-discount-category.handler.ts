import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { DiscountCategory } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { CreateDiscountCategoryCommand } from '../index'
import { DiscountCategoryService } from '../../discountCategory.service'

@CommandHandler(CreateDiscountCategoryCommand)
export class CreateDiscountCategoryHandler
  implements ICommandHandler<CreateDiscountCategoryCommand>
{
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: DiscountCategoryService
  ) {}

  async execute(
    command: CreateDiscountCategoryCommand
  ): Promise<DiscountCategory> {
    this.logger.log(`execute create discountCategory command`)
    try {
      const result = await this.service.create(command.request.data)
      return result as DiscountCategory
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
