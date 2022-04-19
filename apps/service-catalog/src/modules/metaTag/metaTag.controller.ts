import { Controller } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { GrpcMethod, RpcException } from '@nestjs/microservices'
import { SERVICE_LIST } from '@vg/core'
import { Public } from 'nest-keycloak-connect'
import { Count, Id, Query } from '@vg/proto-schema/proto/common'
import {
  MetaTag,
  MetaTags,
  CreateMetaTagInput,
  UpdateMetaTagInput
} from '@vg/proto-schema'
import {
  GetMetaTagQuery,
  GetMetaTagsQuery,
  GetMetaTagsTotalQuery
} from '@vg/service-catalog/modules/metaTag/queries'
import {
  CreateMetaTagCommand,
  DeleteMetaTagCommand,
  UpdateMetaTagCommand
} from '@vg/service-catalog/modules/metaTag/commands'

@Controller()
export class MetaTagController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @GrpcMethod(SERVICE_LIST.catalog.service, 'metaTag')
  @Public()
  async metaTag(request: Id, ctx: any): Promise<MetaTag> {
    try {
      return this.queryBus.execute(new GetMetaTagQuery(request.id))
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
  @GrpcMethod(SERVICE_LIST.catalog.service, 'metaTags')
  @Public()
  async metaTags(request: Query, ctx: any): Promise<MetaTags> {
    try {
      return this.queryBus.execute(new GetMetaTagsQuery(request))
    } catch (e) {
      throw new RpcException(e)
    }
  }

  @GrpcMethod(SERVICE_LIST.catalog.service, 'metaTagsTotal')
  @Public()
  async metaTagsTotal(request: Query, ctx: any): Promise<Count> {
    try {
      return this.queryBus.execute(new GetMetaTagsTotalQuery(request))
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
  @GrpcMethod(SERVICE_LIST.catalog.service, 'createMetaTag')
  async createMetaTag(request: CreateMetaTagInput, ctx: any): Promise<MetaTag> {
    try {
      return await this.commandBus.execute(new CreateMetaTagCommand(request))
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'updateMetaTag')
  async updateMetaTag(request: UpdateMetaTagInput, ctx: any): Promise<MetaTag> {
    try {
      return await this.commandBus.execute(new UpdateMetaTagCommand(request))
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'deleteMetaTag')
  async deleteMetaTag(request: Id, ctx: any): Promise<MetaTag> {
    try {
      return await this.commandBus.execute(new DeleteMetaTagCommand(request))
    } catch (errors) {
      throw new RpcException(errors)
    }
  }
}
