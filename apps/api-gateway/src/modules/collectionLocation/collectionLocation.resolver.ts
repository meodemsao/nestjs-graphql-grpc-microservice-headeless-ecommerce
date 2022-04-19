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
import { CollectionLocationDto } from '@vg/api-gateway/modules/collectionLocation/dto/collectionLocation.dto'
import {
  CollectionLocationFilterArgs,
  CollectionLocationInputType,
  CreateCollectionLocationInput,
  DeleteCollectionLocationInput, UpdateCollectionLocationInput
} from '@vg/api-gateway/modules/collectionLocation/dto/collectionLocation.args'

@Resolver(() => CollectionLocationDto)
@Resource('CollectionLocation')
@UseInterceptors(AuthorizerInterceptor(CollectionLocationDto))
export class CollectionLocationResolver {

  @Query(() => CollectionLocationDto, { nullable: true })
  @Public()
  async collectionLocation(
    @Context() context: GqlContext,
    @Args() args: BaseUniqueFilterArgs,
    @AuthorizerFilter({
      operationGroup: OperationGroup.READ,
      many: false
    }) authFilter: Filter<CollectionLocationDto>
  ): Promise<CollectionLocationDto> {
    const grpcContext = setRpcContext(context)
    const result = await context.rpc.catalog.svc.collectionLocation({
      id: args.id
    }, grpcContext).toPromise()
    return result.data
  }

  @Query(() => [CollectionLocationDto])
  @Public()
  async collectionLocations(
    @Context() context: GqlContext,
    @Args() args: CollectionLocationFilterArgs
  ): Promise<CollectionLocationDto[]> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.catalog.svc.collectionLocations({
      filter: args?.filter ? JSON.stringify(args.filter) : null,
      // @ts-ignore
      paging: args?.paging,
      // @ts-ignore
      sorting: args?.sorting
    }, grpcContext).toPromise()

    return (result.collectionLocations ?? [])
  }

  @Query(() => Int)
  @Public()
  async collectionLocationsTotal(
    @Context() context: GqlContext,
    @Args() args: CollectionLocationFilterArgs
  ): Promise<number> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.catalog.svc.collectionLocationsTotal({
      filter: args?.filter ? JSON.stringify(args.filter) : null,
      paging: undefined,
      sorting: undefined
    }, grpcContext).toPromise()

    return (result.totalCount ?? 0)
  }

  @Public()
  @Mutation(() => CollectionLocationDto, { nullable: true })
  @UseInterceptors(HookInterceptor(HookTypes.BEFORE_CREATE_ONE, CollectionLocationInputType))
  async createCollectionLocation(
    @Context() context: GqlContext,
    @MutationHookArgs() { input }: CreateCollectionLocationInput
  ): Promise<CollectionLocationDto> {
    const grpcContext = setRpcContext(context)
    // @ts-ignore
    return await context.rpc.catalog.svc.createCollectionLocation({ data: input?.collectionLocation }, grpcContext).toPromise()

  }

  @Mutation(() => CollectionLocationDto, { nullable: true })
  @Public()
  async updateCollectionLocation(
    @Context() context: GqlContext,
    @Args() { input }: UpdateCollectionLocationInput
  ): Promise<CollectionLocationDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc.updateCollectionLocation(
      {
        // @ts-ignore
        id: input.id,
        // @ts-ignore
        data: input.update
      },
      grpcContext
    ).toPromise()
  }

  @Mutation(() => CollectionLocationDto, { nullable: true })
  @Public()
  async deleteCollectionLocation(
    @Context() context: GqlContext,
    @Args() { input }: DeleteCollectionLocationInput
  ): Promise<CollectionLocationDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc.deleteCollectionLocation(
      {
        // @ts-ignore
        id: input.id
      },
      grpcContext
    ).toPromise()
  }
}
