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
import { CollectionDto } from '@vg/api-gateway/modules/collection/dto/collection.dto'
import {
  CollectionFilterArgs,
  CollectionInputType,
  CreateCollectionInput,
  DeleteCollectionInput, UpdateCollectionInput
} from '@vg/api-gateway/modules/collection/dto/collection.args'

@Resolver(() => CollectionDto)
@Resource('Collection')
@UseInterceptors(AuthorizerInterceptor(CollectionDto))
export class CollectionResolver {

  @Query(() => CollectionDto, { nullable: true })
  @Public()
  async collection(
    @Context() context: GqlContext,
    @Args() args: BaseUniqueFilterArgs,
    @AuthorizerFilter({
      operationGroup: OperationGroup.READ,
      many: false
    }) authFilter: Filter<CollectionDto>
  ): Promise<CollectionDto> {
    const grpcContext = setRpcContext(context)
    const result = await context.rpc.catalog.svc.collection({
      id: args.id
    }, grpcContext).toPromise()
    return result.data
  }

  @Query(() => [CollectionDto])
  @Public()
  async collections(
    @Context() context: GqlContext,
    @Args() args: CollectionFilterArgs
  ): Promise<CollectionDto[]> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.catalog.svc.collections({
      filter: args?.filter ? JSON.stringify(args.filter) : null,
      // @ts-ignore
      paging: args?.paging,
      // @ts-ignore
      sorting: args?.sorting
    }, grpcContext).toPromise()

    return (result.collections ?? [])
  }

  @Query(() => Int)
  @Public()
  async collectionsTotal(
    @Context() context: GqlContext,
    @Args() args: CollectionFilterArgs
  ): Promise<number> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.catalog.svc.collectionsTotal({
      filter: args?.filter ? JSON.stringify(args.filter) : null,
      paging: undefined,
      sorting: undefined
    }, grpcContext).toPromise()

    return (result.totalCount ?? 0)
  }

  @Public()
  @Mutation(() => CollectionDto, { nullable: true })
  @UseInterceptors(HookInterceptor(HookTypes.BEFORE_CREATE_ONE, CollectionInputType))
  async createCollection(
    @Context() context: GqlContext,
    @MutationHookArgs() { input }: CreateCollectionInput
  ): Promise<CollectionDto> {
    const grpcContext = setRpcContext(context)
    // @ts-ignore
    return await context.rpc.catalog.svc.createCollection({ data: input?.collection }, grpcContext).toPromise()

  }

  @Mutation(() => CollectionDto, { nullable: true })
  @Public()
  async updateCollection(
    @Context() context: GqlContext,
    @Args() { input }: UpdateCollectionInput
  ): Promise<CollectionDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc.updateCollection(
      {
        // @ts-ignore
        id: input.id,
        // @ts-ignore
        data: input.update
      },
      grpcContext
    ).toPromise()
  }

  @Mutation(() => CollectionDto, { nullable: true })
  @Public()
  async deleteCollection(
    @Context() context: GqlContext,
    @Args() { input }: DeleteCollectionInput
  ): Promise<CollectionDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc.deleteCollection(
      {
        // @ts-ignore
        id: input.id
      },
      grpcContext
    ).toPromise()
  }
}
