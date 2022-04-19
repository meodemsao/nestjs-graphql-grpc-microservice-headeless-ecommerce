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
import { ManufacturerLocationDto } from '@vg/api-gateway/modules/manufacturerLocation/dto/manufacturerLocation.dto'
import {
  ManufacturerLocationFilterArgs,
  ManufacturerLocationInputType,
  CreateManufacturerLocationInput,
  DeleteManufacturerLocationInput, UpdateManufacturerLocationInput
} from '@vg/api-gateway/modules/manufacturerLocation/dto/manufacturerLocation.args'

@Resolver(() => ManufacturerLocationDto)
@Resource('ManufacturerLocation')
@UseInterceptors(AuthorizerInterceptor(ManufacturerLocationDto))
export class ManufacturerLocationResolver {

  @Query(() => ManufacturerLocationDto, { nullable: true })
  @Public()
  async manufacturerLocation(
    @Context() context: GqlContext,
    @Args() args: BaseUniqueFilterArgs,
    @AuthorizerFilter({
      operationGroup: OperationGroup.READ,
      many: false
    }) authFilter: Filter<ManufacturerLocationDto>
  ): Promise<ManufacturerLocationDto> {
    const grpcContext = setRpcContext(context)
    const result = await context.rpc.catalog.svc.manufacturerLocation({
      id: args.id
    }, grpcContext).toPromise()
    return result.data
  }

  @Query(() => [ManufacturerLocationDto])
  @Public()
  async manufacturerLocations(
    @Context() context: GqlContext,
    @Args() args: ManufacturerLocationFilterArgs
  ): Promise<ManufacturerLocationDto[]> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.catalog.svc.manufacturerLocations({
      filter: args?.filter ? JSON.stringify(args.filter) : null,
      // @ts-ignore
      paging: args?.paging,
      // @ts-ignore
      sorting: args?.sorting
    }, grpcContext).toPromise()

    return (result.manufacturerLocations ?? [])
  }

  @Query(() => Int)
  @Public()
  async manufacturerLocationsTotal(
    @Context() context: GqlContext,
    @Args() args: ManufacturerLocationFilterArgs
  ): Promise<number> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.catalog.svc.manufacturerLocationsTotal({
      filter: args?.filter ? JSON.stringify(args.filter) : null,
      paging: undefined,
      sorting: undefined
    }, grpcContext).toPromise()

    return (result.totalCount ?? 0)
  }

  @Public()
  @Mutation(() => ManufacturerLocationDto, { nullable: true })
  @UseInterceptors(HookInterceptor(HookTypes.BEFORE_CREATE_ONE, ManufacturerLocationInputType))
  async createManufacturerLocation(
    @Context() context: GqlContext,
    @MutationHookArgs() { input }: CreateManufacturerLocationInput
  ): Promise<ManufacturerLocationDto> {
    const grpcContext = setRpcContext(context)
    // @ts-ignore
    return await context.rpc.catalog.svc.createManufacturerLocation({ data: input?.manufacturerLocation }, grpcContext).toPromise()

  }

  @Mutation(() => ManufacturerLocationDto, { nullable: true })
  @Public()
  async updateManufacturerLocation(
    @Context() context: GqlContext,
    @Args() { input }: UpdateManufacturerLocationInput
  ): Promise<ManufacturerLocationDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc.updateManufacturerLocation(
      {
        // @ts-ignore
        id: input.id,
        // @ts-ignore
        data: input.update
      },
      grpcContext
    ).toPromise()
  }

  @Mutation(() => ManufacturerLocationDto, { nullable: true })
  @Public()
  async deleteManufacturerLocation(
    @Context() context: GqlContext,
    @Args() { input }: DeleteManufacturerLocationInput
  ): Promise<ManufacturerLocationDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc.deleteManufacturerLocation(
      {
        // @ts-ignore
        id: input.id
      },
      grpcContext
    ).toPromise()
  }
}
