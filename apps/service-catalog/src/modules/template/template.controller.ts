import { Controller } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { GrpcMethod, RpcException } from '@nestjs/microservices'
import { SERVICE_LIST } from '@vg/core'
import { Public } from 'nest-keycloak-connect'
import { Count, Id, Query } from '@vg/proto-schema/proto/common'
import {
  Template,
  Templates,
  CreateTemplateInput, UpdateTemplateInput
} from '@vg/proto-schema'
import {
  GetTemplateQuery,
  GetTemplatesQuery, GetTemplatesTotalQuery
} from '@vg/service-catalog/modules/template/queries'
import {
  CreateTemplateCommand, DeleteTemplateCommand,
  UpdateTemplateCommand
} from '@vg/service-catalog/modules/template/commands'

@Controller()
export class TemplateController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus
  ) {
  }

  @GrpcMethod(SERVICE_LIST.catalog.service, 'template')
  @Public()
  async template(
    request: Id,
    ctx: any
  ): Promise<Template> {
    try {
      return this.queryBus.execute(
        new GetTemplateQuery(request.id)
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
  @GrpcMethod(SERVICE_LIST.catalog.service, 'templates')
  @Public()
  async templates(
    request: Query,
    ctx: any
  ): Promise<Templates> {
    try {
      return this.queryBus.execute(
        new GetTemplatesQuery(request)
      )
    } catch (e) {
      throw new RpcException(e)
    }
  }

  @GrpcMethod(SERVICE_LIST.catalog.service, 'templatesTotal')
  @Public()
  async templatesTotal(
    request: Query,
    ctx: any
  ): Promise<Count> {
    try {
      return this.queryBus.execute(
        new GetTemplatesTotalQuery(request)
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
  @GrpcMethod(SERVICE_LIST.catalog.service, 'createTemplate')
  async createTemplate(
    request: CreateTemplateInput,
    ctx: any
  ): Promise<Template> {
    try {
      return await this.commandBus.execute(
        new CreateTemplateCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'updateTemplate')
  async updateTemplate(
    request: UpdateTemplateInput,
    ctx: any
  ): Promise<Template> {
    try {
      return await this.commandBus.execute(
        new UpdateTemplateCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'deleteTemplate')
  async deleteTemplate(
    request: Id,
    ctx: any
  ): Promise<Template> {
    try {
      return await this.commandBus.execute(
        new DeleteTemplateCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }
}
