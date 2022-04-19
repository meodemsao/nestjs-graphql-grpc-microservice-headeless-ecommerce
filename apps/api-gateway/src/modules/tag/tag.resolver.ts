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
import { TagDto } from '@vg/api-gateway/modules/tag/dto/tag.dto'
import {
  TagFilterArgs,
  TagInputType,
  CreateTagInput,
  DeleteTagInput, UpdateTagInput
} from '@vg/api-gateway/modules/tag/dto/tag.args'

@Resolver(() => TagDto)
@Resource('Tag')
@UseInterceptors(AuthorizerInterceptor(TagDto))
export class TagResolver {

  @Query(() => TagDto, { nullable: true })
  @Public()
  async tag(
    @Context() context: GqlContext,
    @Args() args: BaseUniqueFilterArgs,
    @AuthorizerFilter({
      operationGroup: OperationGroup.READ,
      many: false
    }) authFilter: Filter<TagDto>
  ): Promise<TagDto> {
    const grpcContext = setRpcContext(context)
    const result = await context.rpc.catalog.svc.tag({
      id: args.id
    }, grpcContext).toPromise()
    return result.data
  }

  @Query(() => [TagDto])
  @Public()
  async tags(
    @Context() context: GqlContext,
    @Args() args: TagFilterArgs
  ): Promise<TagDto[]> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.catalog.svc.tags({
      filter: args?.filter ? JSON.stringify(args.filter) : null,
      // @ts-ignore
      paging: args?.paging,
      // @ts-ignore
      sorting: args?.sorting
    }, grpcContext).toPromise()

    return (result.Tags ?? [])
  }

  @Query(() => Int)
  @Public()
  async tagsTotal(
    @Context() context: GqlContext,
    @Args() args: TagFilterArgs
  ): Promise<number> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.catalog.svc.tagsTotal({
      filter: args?.filter ? JSON.stringify(args.filter) : null,
      paging: undefined,
      sorting: undefined
    }, grpcContext).toPromise()

    return (result.totalCount ?? 0)
  }

  @Public()
  @Mutation(() => TagDto, { nullable: true })
  @UseInterceptors(HookInterceptor(HookTypes.BEFORE_CREATE_ONE, TagInputType))
  async createTag(
    @Context() context: GqlContext,
    @MutationHookArgs() { input }: CreateTagInput
  ): Promise<TagDto> {
    const grpcContext = setRpcContext(context)
    // @ts-ignore
    return await context.rpc.catalog.svc.createTag({ data: input?.Tag }, grpcContext).toPromise()

  }

  @Mutation(() => TagDto, { nullable: true })
  @Public()
  async updateTag(
    @Context() context: GqlContext,
    @Args() { input }: UpdateTagInput
  ): Promise<TagDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc.updateTag(
      {
        // @ts-ignore
        id: input.id,
        // @ts-ignore
        data: input.update
      },
      grpcContext
    ).toPromise()
  }

  @Mutation(() => TagDto, { nullable: true })
  @Public()
  async deleteTag(
    @Context() context: GqlContext,
    @Args() { input }: DeleteTagInput
  ): Promise<TagDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc.deleteTag(
      {
        // @ts-ignore
        id: input.id
      },
      grpcContext
    ).toPromise()
  }
}
