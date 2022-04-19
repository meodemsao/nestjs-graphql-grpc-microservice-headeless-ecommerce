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
import { TemplateDto } from '@vg/api-gateway/modules/template/dto/template.dto'
import {
  TemplateFilterArgs,
  TemplateInputType,
  CreateTemplateInput,
  DeleteTemplateInput, UpdateTemplateInput
} from '@vg/api-gateway/modules/template/dto/template.args'

@Resolver(() => TemplateDto)
@Resource('Template')
@UseInterceptors(AuthorizerInterceptor(TemplateDto))
export class TemplateResolver {

  @Query(() => TemplateDto, { nullable: true })
  @Public()
  async template(
    @Context() context: GqlContext,
    @Args() args: BaseUniqueFilterArgs,
    @AuthorizerFilter({
      operationGroup: OperationGroup.READ,
      many: false
    }) authFilter: Filter<TemplateDto>
  ): Promise<TemplateDto> {
    const grpcContext = setRpcContext(context)
    const result = await context.rpc.catalog.svc.template({
      id: args.id
    }, grpcContext).toPromise()
    return result.data
  }

  @Query(() => [TemplateDto])
  @Public()
  async templates(
    @Context() context: GqlContext,
    @Args() args: TemplateFilterArgs
  ): Promise<TemplateDto[]> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.catalog.svc.templates({
      filter: args?.filter ? JSON.stringify(args.filter) : null,
      // @ts-ignore
      paging: args?.paging,
      // @ts-ignore
      sorting: args?.sorting
    }, grpcContext).toPromise()

    return (result.templates ?? [])
  }

  @Query(() => Int)
  @Public()
  async templatesTotal(
    @Context() context: GqlContext,
    @Args() args: TemplateFilterArgs
  ): Promise<number> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.catalog.svc.templatesTotal({
      filter: args?.filter ? JSON.stringify(args.filter) : null,
      paging: undefined,
      sorting: undefined
    }, grpcContext).toPromise()

    return (result.totalCount ?? 0)
  }

  @Public()
  @Mutation(() => TemplateDto, { nullable: true })
  @UseInterceptors(HookInterceptor(HookTypes.BEFORE_CREATE_ONE, TemplateInputType))
  async createTemplate(
    @Context() context: GqlContext,
    @MutationHookArgs() { input }: CreateTemplateInput
  ): Promise<TemplateDto> {
    const grpcContext = setRpcContext(context)
    // @ts-ignore
    return await context.rpc.catalog.svc.createTemplate({ data: input?.Template }, grpcContext).toPromise()

  }

  @Mutation(() => TemplateDto, { nullable: true })
  @Public()
  async updateTemplate(
    @Context() context: GqlContext,
    @Args() { input }: UpdateTemplateInput
  ): Promise<TemplateDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc.updateTemplate(
      {
        // @ts-ignore
        id: input.id,
        // @ts-ignore
        data: input.update
      },
      grpcContext
    ).toPromise()
  }

  @Mutation(() => TemplateDto, { nullable: true })
  @Public()
  async deleteTemplate(
    @Context() context: GqlContext,
    @Args() { input }: DeleteTemplateInput
  ): Promise<TemplateDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc.deleteTemplate(
      {
        // @ts-ignore
        id: input.id
      },
      grpcContext
    ).toPromise()
  }
}
