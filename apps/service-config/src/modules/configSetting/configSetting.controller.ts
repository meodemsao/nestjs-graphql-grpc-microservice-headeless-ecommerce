import { Controller } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { GrpcMethod, RpcException } from '@nestjs/microservices'
import { SERVICE_LIST } from '@vg/core'
import { Public } from 'nest-keycloak-connect'
import { Count, Id, Query } from '@vg/proto-schema/proto/common'
import {
  ConfigSetting,
  ConfigSettings,
  CreateConfigSettingInput,
  UpdateConfigSettingInput
} from '@vg/proto-schema'
import {
  GetConfigSettingQuery,
  GetConfigSettingsQuery,
  GetConfigSettingsTotalQuery
} from '@vg/service-config/modules/configSetting/queries'
import {
  CreateConfigSettingCommand,
  DeleteConfigSettingCommand,
  UpdateConfigSettingCommand
} from '@vg/service-config/modules/configSetting/commands'

@Controller()
export class ConfigSettingController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @GrpcMethod(SERVICE_LIST.config.service, 'configSetting')
  @Public()
  async configSetting(request: Id, ctx: any): Promise<ConfigSetting> {
    try {
      return this.queryBus.execute(new GetConfigSettingQuery(request.id))
    } catch (e) {
      console.log('e controller............', e)
      throw new RpcException(e)
    }
  }

  /**
   * carts
   * @param request
   * @param ctx
   */
  @GrpcMethod(SERVICE_LIST.config.service, 'configSettings')
  @Public()
  async configSettings(request: Query, ctx: any): Promise<ConfigSettings> {
    try {
      return this.queryBus.execute(new GetConfigSettingsQuery(request))
    } catch (e) {
      throw new RpcException(e)
    }
  }

  @GrpcMethod(SERVICE_LIST.config.service, 'configSettingsTotal')
  @Public()
  async configSettingsTotal(request: Query, ctx: any): Promise<Count> {
    try {
      return this.queryBus.execute(new GetConfigSettingsTotalQuery(request))
    } catch (e) {
      throw new RpcException(e)
    }
  }

  /**
   * create cart
   * @param request
   * @param ctx
   */
  @Public()
  @GrpcMethod(SERVICE_LIST.config.service, 'createConfigSetting')
  async createConfigSetting(request: CreateConfigSettingInput, ctx: any): Promise<ConfigSetting> {
    try {
      return await this.commandBus.execute(new CreateConfigSettingCommand(request))
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.config.service, 'updateConfigSetting')
  async updateConfigSetting(request: UpdateConfigSettingInput, ctx: any): Promise<ConfigSetting> {
    try {
      return await this.commandBus.execute(new UpdateConfigSettingCommand(request))
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.config.service, 'deleteConfigSetting')
  async deleteConfigSetting(request: Id, ctx: any): Promise<ConfigSetting> {
    try {
      return await this.commandBus.execute(new DeleteConfigSettingCommand(request))
    } catch (errors) {
      throw new RpcException(errors)
    }
  }
}
