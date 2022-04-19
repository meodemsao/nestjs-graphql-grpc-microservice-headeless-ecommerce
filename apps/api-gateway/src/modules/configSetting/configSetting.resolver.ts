import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GqlContext } from '@vg/core'
import { setRpcContext } from '@vg/core/helpers/set-grpc-context.helpers'
import { Public, Resource } from 'nest-keycloak-connect'
import { BaseUniqueFilterArgs } from '@vg/repository/dtos/base-arg.dto'
import { UseInterceptors } from '@nestjs/common'
import {
  AuthorizerFilter,
  AuthorizerInterceptor,
  HookTypes,
  MutationHookArgs,
  OperationGroup
} from '@vg/query-graphql'
import { HookInterceptor } from '@vg/common/interceptors/hook.interceptor'
import { Filter } from '@nestjs-query/core'
import { ConfigSettingDto } from '@vg/api-gateway/modules/configSetting/dto/configSetting.dto'
import {
  ConfigSettingFilterArgs,
  ConfigSettingInputType,
  CreateConfigSettingInput,
  DeleteConfigSettingInput, UpdateConfigSettingInput
} from '@vg/api-gateway/modules/configSetting/dto/configSetting.args'

@Resolver(() => ConfigSettingDto)
@Resource('ConfigSetting')
@UseInterceptors(AuthorizerInterceptor(ConfigSettingDto))
export class ConfigSettingResolver {

  @Query(() => ConfigSettingDto, { nullable: true })
  @Public()
  async configSetting(
    @Context() context: GqlContext,
    @Args() args: BaseUniqueFilterArgs,
    @AuthorizerFilter({
      operationGroup: OperationGroup.READ,
      many: false
    }) authFilter: Filter<ConfigSettingDto>
  ): Promise<ConfigSettingDto> {
    const grpcContext = setRpcContext(context)
    const result = await context.rpc.config.svc.configSetting({
      id: args.id
    }, grpcContext).toPromise()
    return result.data
  }

  @Query(() => [ConfigSettingDto])
  @Public()
  async configSettings(
    @Context() context: GqlContext,
    @Args() args: ConfigSettingFilterArgs
  ): Promise<ConfigSettingDto[]> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.config.svc.configSettings({
      filter: args?.filter ? JSON.stringify(args.filter) : null,
      // @ts-ignore
      paging: args?.paging,
      // @ts-ignore
      sorting: args?.sorting
    }, grpcContext).toPromise()

    return (result.configSettings ?? [])
  }

  @Query(() => Int)
  @Public()
  async configSettingsTotal(
    @Context() context: GqlContext,
    @Args() args: ConfigSettingFilterArgs
  ): Promise<number> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.config.svc.configSettingsTotal({
      filter: args?.filter ? JSON.stringify(args.filter) : null,
      paging: undefined,
      sorting: undefined
    }, grpcContext).toPromise()

    return (result.totalCount ?? 0)
  }

  @Public()
  @Mutation(() => ConfigSettingDto, { nullable: true })
  @UseInterceptors(HookInterceptor(HookTypes.BEFORE_CREATE_ONE, ConfigSettingInputType))
  async createConfigSetting(
    @Context() context: GqlContext,
    @MutationHookArgs() { input }: CreateConfigSettingInput
  ): Promise<ConfigSettingDto> {
    const grpcContext = setRpcContext(context)
    // @ts-ignore
    return await context.rpc.config.svc.createConfigSetting({ data: input?.ConfigSetting }, grpcContext).toPromise()

  }

  @Mutation(() => ConfigSettingDto, { nullable: true })
  @Public()
  async updateConfigSetting(
    @Context() context: GqlContext,
    @Args() { input }: UpdateConfigSettingInput
  ): Promise<ConfigSettingDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.config.svc.updateConfigSetting(
      {
        // @ts-ignore
        id: input.id,
        // @ts-ignore
        data: input.update
      },
      grpcContext
    ).toPromise()
  }

  @Mutation(() => ConfigSettingDto, { nullable: true })
  @Public()
  async deleteConfigSetting(
    @Context() context: GqlContext,
    @Args() { input }: DeleteConfigSettingInput
  ): Promise<ConfigSettingDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.config.svc.deleteConfigSetting(
      {
        // @ts-ignore
        id: input.id
      },
      grpcContext
    ).toPromise()
  }
}
