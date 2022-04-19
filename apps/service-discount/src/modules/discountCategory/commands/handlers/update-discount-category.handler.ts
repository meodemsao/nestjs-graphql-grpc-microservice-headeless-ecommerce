import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { DiscountCategoryService } from '../../discountCategory.service'
import { DiscountCategory } from '@vg/proto-schema'
import { UpdateDiscountCategoryCommand } from '../index'

@CommandHandler(UpdateDiscountCategoryCommand)
export class UpdateDiscountCategoryHandler
  implements ICommandHandler<UpdateDiscountCategoryCommand>
{
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: DiscountCategoryService
  ) {}

  async execute(
    command: UpdateDiscountCategoryCommand
  ): Promise<DiscountCategory> {
    try {
      const result = await this.service.update(
        command.data.id,
        command.data.data
      )

      return result as DiscountCategory
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
