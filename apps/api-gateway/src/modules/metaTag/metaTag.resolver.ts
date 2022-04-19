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
import { MetaTagDto } from '@vg/api-gateway/modules/metaTag/dto/metaTag.dto'
import {
  MetaTagFilterArgs,
  MetaTagInputType,
  CreateMetaTagInput,
  DeleteMetaTagInput,
  UpdateMetaTagInput
} from '@vg/api-gateway/modules/metaTag/dto/metaTag.args'

@Resolver(() => MetaTagDto)
@Resource('MetaTag')
@UseInterceptors(AuthorizerInterceptor(MetaTagDto))
export class MetaTagResolver {
  @Query(() => MetaTagDto, { nullable: true })
  @Public()
  async metaTag(
    @Context() context: GqlContext,
    @Args() args: BaseUniqueFilterArgs,
    @AuthorizerFilter({
      operationGroup: OperationGroup.READ,
      many: false
    })
    authFilter: Filter<MetaTagDto>
  ): Promise<MetaTagDto> {
    const grpcContext = setRpcContext(context)
    const result = await context.rpc.catalog.svc
      .metaTag(
        {
          id: args.id
        },
        grpcContext
      )
      .toPromise()
    return result.data
  }

  @Query(() => [MetaTagDto])
  @Public()
  async metaTags(
    @Context() context: GqlContext,
    @Args() args: MetaTagFilterArgs
  ): Promise<MetaTagDto[]> {
    const grpcContext = setRpcContext(context)

    const categories = await context.rpc.catalog.svc
      .metaTags(
        {
          filter: args?.filter ? JSON.stringify(args.filter) : null,
          // @ts-ignore
          paging: args?.paging,
          // @ts-ignore
          sorting: args?.sorting
        },
        grpcContext
      )
      .toPromise()

    return categories.metaTags ?? []
  }

  @Query(() => Int)
  @Public()
  async metaTagsTotal(
    @Context() context: GqlContext,
    @Args() args: MetaTagFilterArgs
  ): Promise<number> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.catalog.svc
      .metaTagsTotal(
        {
          filter: args?.filter ? JSON.stringify(args.filter) : null,
          paging: undefined,
          sorting: undefined
        },
        grpcContext
      )
      .toPromise()

    return result.totalCount ?? 0
  }

  @Public()
  @Mutation(() => MetaTagDto, { nullable: true })
  @UseInterceptors(
    HookInterceptor(HookTypes.BEFORE_CREATE_ONE, MetaTagInputType)
  )
  async createMetaTag(
    @Context() context: GqlContext,
    @MutationHookArgs() { input }: CreateMetaTagInput
  ): Promise<MetaTagDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc
      // @ts-ignore
      .createMetaTag({ data: input?.metaTag }, grpcContext)
      .toPromise()
  }

  @Mutation(() => MetaTagDto, { nullable: true })
  @Public()
  async updateMetaTag(
    @Context() context: GqlContext,
    @Args() { input }: UpdateMetaTagInput
  ): Promise<MetaTagDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc
      .updateMetaTag(
        {
          // @ts-ignore
          id: input.id,
          // @ts-ignore
          data: input.update
        },
        grpcContext
      )
      .toPromise()
  }

  @Mutation(() => MetaTagDto, { nullable: true })
  @Public()
  async deleteMetaTag(
    @Context() context: GqlContext,
    @Args() { input }: DeleteMetaTagInput
  ): Promise<MetaTagDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc
      .deleteMetaTag(
        {
          // @ts-ignore
          id: input.id
        },
        grpcContext
      )
      .toPromise()
  }
}
