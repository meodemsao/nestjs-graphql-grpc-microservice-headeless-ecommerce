import { Controller } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { GrpcMethod, RpcException } from '@nestjs/microservices'
import { SERVICE_LIST } from '@vg/core'
import { Public } from 'nest-keycloak-connect'
import { Count, Id, Query } from '@vg/proto-schema/proto/common'
import {
  Tag,
  Tags,
  CreateTagInput, UpdateTagInput
} from '@vg/proto-schema'
import {
  GetTagQuery,
  GetTagsQuery, GetTagsTotalQuery
} from '@vg/service-catalog/modules/tag/queries'
import {
  CreateTagCommand, DeleteTagCommand,
  UpdateTagCommand
} from '@vg/service-catalog/modules/tag/commands'

@Controller()
export class TagController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus
  ) {
  }

  @GrpcMethod(SERVICE_LIST.catalog.service, 'tag')
  @Public()
  async tag(
    request: Id,
    ctx: any
  ): Promise<Tag> {
    try {
      return this.queryBus.execute(
        new GetTagQuery(request.id)
      )
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
  @GrpcMethod(SERVICE_LIST.catalog.service, 'tags')
  @Public()
  async tags(
    request: Query,
    ctx: any
  ): Promise<Tags> {
    try {
      return this.queryBus.execute(
        new GetTagsQuery(request)
      )
    } catch (e) {
      throw new RpcException(e)
    }
  }

  @GrpcMethod(SERVICE_LIST.catalog.service, 'tagsTotal')
  @Public()
  async tagsTotal(
    request: Query,
    ctx: any
  ): Promise<Count> {
    try {
      return this.queryBus.execute(
        new GetTagsTotalQuery(request)
      )
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
  @GrpcMethod(SERVICE_LIST.catalog.service, 'createTag')
  async createTag(
    request: CreateTagInput,
    ctx: any
  ): Promise<Tag> {
    try {
      return await this.commandBus.execute(
        new CreateTagCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'updateTag')
  async updateTag(
    request: UpdateTagInput,
    ctx: any
  ): Promise<Tag> {
    try {
      return await this.commandBus.execute(
        new UpdateTagCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'deleteTag')
  async deleteTag(
    request: Id,
    ctx: any
  ): Promise<Tag> {
    try {
      return await this.commandBus.execute(
        new DeleteTagCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }
}
