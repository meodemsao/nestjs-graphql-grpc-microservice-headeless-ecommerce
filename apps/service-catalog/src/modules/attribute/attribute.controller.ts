import { Controller } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { GrpcMethod, RpcException } from '@nestjs/microservices'
import { SERVICE_LIST } from '@vg/core'
import { Public } from 'nest-keycloak-connect'
import { Count, Id, Query } from '@vg/proto-schema/proto/common'
import {
  Attribute,
  Attributes,
  CreateAttributeInput,
  UpdateAttributeInput
} from '@vg/proto-schema'
import {
  GetAttributeQuery,
  GetAttributesQuery,
  GetAttributesTotalQuery
} from '@vg/service-catalog/modules/attribute/queries'
import {
  CreateAttributeCommand,
  DeleteAttributeCommand,
  UpdateAttributeCommand
} from '@vg/service-catalog/modules/attribute/commands'

@Controller()
export class AttributeController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @GrpcMethod(SERVICE_LIST.catalog.service, 'attribute')
  @Public()
  async attribute(request: Id, ctx: any): Promise<Attribute> {
    try {
      return this.queryBus.execute(new GetAttributeQuery(request.id))
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
  @GrpcMethod(SERVICE_LIST.catalog.service, 'attributes')
  @Public()
  async attributes(request: Query, ctx: any): Promise<Attributes> {
    try {
      return this.queryBus.execute(new GetAttributesQuery(request))
    } catch (e) {
      throw new RpcException(e)
    }
  }

  @GrpcMethod(SERVICE_LIST.catalog.service, 'attributesTotal')
  @Public()
  async attributesTotal(request: Query, ctx: any): Promise<Count> {
    try {
      return this.queryBus.execute(new GetAttributesTotalQuery(request))
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
  @GrpcMethod(SERVICE_LIST.catalog.service, 'createAttribute')
  async createAttribute(
    request: CreateAttributeInput,
    ctx: any
  ): Promise<Attribute> {
    try {
      return await this.commandBus.execute(new CreateAttributeCommand(request))
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'updateAttribute')
  async updateAttribute(
    request: UpdateAttributeInput,
    ctx: any
  ): Promise<Attribute> {
    try {
      return await this.commandBus.execute(new UpdateAttributeCommand(request))
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'deleteAttribute')
  async deleteAttribute(request: Id, ctx: any): Promise<Attribute> {
    try {
      return await this.commandBus.execute(new DeleteAttributeCommand(request))
    } catch (errors) {
      throw new RpcException(errors)
    }
  }
}
