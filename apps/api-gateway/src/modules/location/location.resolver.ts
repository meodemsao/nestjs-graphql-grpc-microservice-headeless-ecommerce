import { Filter } from '@nestjs-query/core'
import { UseInterceptors } from '@nestjs/common'
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import {
  LocationFilterArgs,
  LocationInputType,
  CreateLocationInput,
  DeleteLocationInput,
  UpdateLocationInput
} from '@vg/api-gateway/modules/location/dto/location.args'
import { LocationDto } from '@vg/api-gateway/modules/location/dto/location.dto'
import { HookInterceptor } from '@vg/common/interceptors/hook.interceptor'
import { GqlContext } from '@vg/core'
import { setRpcContext } from '@vg/core/helpers/set-grpc-context.helpers'
import {
  AuthorizerFilter,
  AuthorizerInterceptor,
  HookTypes,
  MutationHookArgs,
  OperationGroup
} from '@vg/query-graphql'
import { BaseUniqueFilterArgs } from '@vg/repository/dtos/base-arg.dto'
import { Public, Resource } from 'nest-keycloak-connect'

@Resolver(() => LocationDto)
@Resource('Location')
@UseInterceptors(AuthorizerInterceptor(LocationDto))
export class LocationResolver {
  @Query(() => LocationDto, { nullable: true })
  @Public()
  async location(
    @Context() context: GqlContext,
    @Args() args: BaseUniqueFilterArgs,
    @AuthorizerFilter({
      operationGroup: OperationGroup.READ,
      many: false
    })
    authFilter: Filter<LocationDto>
  ): Promise<LocationDto> {
    const grpcContext = setRpcContext(context)
    const result = await context.rpc.inventory.svc
      .location(
        {
          id: args.id
        },
        grpcContext
      )
      .toPromise()
    return result.data
  }

  @Query(() => [LocationDto])
  @Public()
  async locations(
    @Context() context: GqlContext,
    @Args() args: LocationFilterArgs
  ): Promise<LocationDto[]> {
    const grpcContext = setRpcContext(context)

    const categories = await context.rpc.inventory.svc
      .locations(
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

    return categories.locations ?? []
  }

  @Query(() => Int)
  @Public()
  async locationsTotal(
    @Context() context: GqlContext,
    @Args() args: LocationFilterArgs
  ): Promise<number> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.inventory.svc
      .locationsTotal(
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
  @Mutation(() => LocationDto, { nullable: true })
  @UseInterceptors(
    HookInterceptor(HookTypes.BEFORE_CREATE_ONE, LocationInputType)
  )
  async createLocation(
    @Context() context: GqlContext,
    @MutationHookArgs() { input }: CreateLocationInput
  ): Promise<LocationDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.inventory.svc
      // @ts-ignore
      .createLocation({ data: input?.location }, grpcContext)
      .toPromise()
  }

  @Mutation(() => LocationDto, { nullable: true })
  @Public()
  async updateLocation(
    @Context() context: GqlContext,
    @Args() { input }: UpdateLocationInput
  ): Promise<LocationDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.inventory.svc
      .updateLocation(
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

  @Mutation(() => LocationDto, { nullable: true })
  @Public()
  async deleteLocation(
    @Context() context: GqlContext,
    @Args() { input }: DeleteLocationInput
  ): Promise<LocationDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.inventory.svc
      .deleteLocation(
        {
          // @ts-ignore
          id: input.id
        },
        grpcContext
      )
      .toPromise()
  }
}
