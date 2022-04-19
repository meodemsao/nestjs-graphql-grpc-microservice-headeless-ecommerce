import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { DiscountRequirement } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { CreateDiscountRequirementCommand } from '../index'
import { DiscountRequirementService } from '../../discountRequirement.service'

@CommandHandler(CreateDiscountRequirementCommand)
export class CreateDiscountRequirementHandler
  implements ICommandHandler<CreateDiscountRequirementCommand>
{
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: DiscountRequirementService
  ) {}

  async execute(
    command: CreateDiscountRequirementCommand
  ): Promise<DiscountRequirement> {
    this.logger.log(`execute create discountRequirement command`)
    try {
      const result = await this.service.create(command.request.data)
      return result as DiscountRequirement
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
