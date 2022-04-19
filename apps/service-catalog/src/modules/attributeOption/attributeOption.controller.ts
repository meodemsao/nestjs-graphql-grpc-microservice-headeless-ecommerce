import { Controller } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { GrpcMethod, RpcException } from '@nestjs/microservices'
import { SERVICE_LIST } from '@vg/core'
import { Public } from 'nest-keycloak-connect'
import { Count, Id, Query } from '@vg/proto-schema/proto/common'
import {
  AttributeOption,
  AttributeOptions,
  CreateAttributeOptionInput,
  UpdateAttributeOptionInput
} from '@vg/proto-schema'
import {
  GetAttributeOptionQuery,
  GetAttributeOptionsQuery,
  GetAttributeOptionsTotalQuery
} from '@vg/service-catalog/modules/attributeOption/queries'
import {
  CreateAttributeOptionCommand,
  DeleteAttributeOptionCommand,
  UpdateAttributeOptionCommand
} from '@vg/service-catalog/modules/attributeOption/commands'

@Controller()
export class AttributeOptionController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @GrpcMethod(SERVICE_LIST.catalog.service, 'attributeOption')
  @Public()
  async attributeOption(request: Id, ctx: any): Promise<AttributeOption> {
    try {
      return this.queryBus.execute(new GetAttributeOptionQuery(request.id))
    } catch (e) {
      console.log('e controller............', e)
      throw new RpcException(e)
    }
  }

  /**
   * catalogs
   * @param request
   * @param ctx
   */
  @GrpcMethod(SERVICE_LIST.catalog.service, 'attributeOptions')
  @Public()
  async attributeOptions(request: Query, ctx: any): Promise<AttributeOptions> {
    try {
      return this.queryBus.execute(new GetAttributeOptionsQuery(request))
    } catch (e) {
      throw new RpcException(e)
    }
  }

  @GrpcMethod(SERVICE_LIST.catalog.service, 'attributeOptionsTotal')
  @Public()
  async attributeOptionsTotal(request: Query, ctx: any): Promise<Count> {
    try {
      return this.queryBus.execute(new GetAttributeOptionsTotalQuery(request))
    } catch (e) {
      throw new RpcException(e)
    }
  }

  /**
   * create catalog
   * @param request
   * @param ctx
   */
  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'createAttributeOption')
  async createAttributeOption(
    request: CreateAttributeOptionInput,
    ctx: any
  ): Promise<AttributeOption> {
    try {
      return await this.commandBus.execute(
        new CreateAttributeOptionCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'updateAttributeOption')
  async updateAttributeOption(
    request: UpdateAttributeOptionInput,
    ctx: any
  ): Promise<AttributeOption> {
    try {
      return await this.commandBus.execute(
        new UpdateAttributeOptionCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'deleteAttributeOption')
  async deleteAttributeOption(request: Id, ctx: any): Promise<AttributeOption> {
    try {
      return await this.commandBus.execute(
        new DeleteAttributeOptionCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }
}
