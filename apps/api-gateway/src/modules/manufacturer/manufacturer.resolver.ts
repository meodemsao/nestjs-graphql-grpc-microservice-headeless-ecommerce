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
import { ManufacturerDto } from '@vg/api-gateway/modules/manufacturer/dto/manufacturer.dto'
import {
  ManufacturerFilterArgs,
  ManufacturerInputType,
  CreateManufacturerInput,
  DeleteManufacturerInput, UpdateManufacturerInput
} from '@vg/api-gateway/modules/manufacturer/dto/manufacturer.args'

@Resolver(() => ManufacturerDto)
@Resource('Manufacturer')
@UseInterceptors(AuthorizerInterceptor(ManufacturerDto))
export class ManufacturerResolver {

  @Query(() => ManufacturerDto, { nullable: true })
  @Public()
  async manufacturer(
    @Context() context: GqlContext,
    @Args() args: BaseUniqueFilterArgs,
    @AuthorizerFilter({
      operationGroup: OperationGroup.READ,
      many: false
    }) authFilter: Filter<ManufacturerDto>
  ): Promise<ManufacturerDto> {
    const grpcContext = setRpcContext(context)
    const result = await context.rpc.catalog.svc.manufacturer({
      id: args.id
    }, grpcContext).toPromise()
    return result.data
  }

  @Query(() => [ManufacturerDto])
  @Public()
  async manufacturers(
    @Context() context: GqlContext,
    @Args() args: ManufacturerFilterArgs
  ): Promise<ManufacturerDto[]> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.catalog.svc.manufacturers({
      filter: args?.filter ? JSON.stringify(args.filter) : null,
      // @ts-ignore
      paging: args?.paging,
      // @ts-ignore
      sorting: args?.sorting
    }, grpcContext).toPromise()

    return (result.manufacturers ?? [])
  }

  @Query(() => Int)
  @Public()
  async ManufacturersTotal(
    @Context() context: GqlContext,
    @Args() args: ManufacturerFilterArgs
  ): Promise<number> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.catalog.svc.manufacturersTotal({
      filter: args?.filter ? JSON.stringify(args.filter) : null,
      paging: undefined,
      sorting: undefined
    }, grpcContext).toPromise()

    return (result.totalCount ?? 0)
  }

  @Public()
  @Mutation(() => ManufacturerDto, { nullable: true })
  @UseInterceptors(HookInterceptor(HookTypes.BEFORE_CREATE_ONE, ManufacturerInputType))
  async createManufacturer(
    @Context() context: GqlContext,
    @MutationHookArgs() { input }: CreateManufacturerInput
  ): Promise<ManufacturerDto> {
    const grpcContext = setRpcContext(context)
    // @ts-ignore
    return await context.rpc.catalog.svc.createManufacturer({ data: input?.manufacturer }, grpcContext).toPromise()

  }

  @Mutation(() => ManufacturerDto, { nullable: true })
  @Public()
  async updateManufacturer(
    @Context() context: GqlContext,
    @Args() { input }: UpdateManufacturerInput
  ): Promise<ManufacturerDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc.updateManufacturer(
      {
        // @ts-ignore
        id: input.id,
        // @ts-ignore
        data: input.update
      },
      grpcContext
    ).toPromise()
  }

  @Mutation(() => ManufacturerDto, { nullable: true })
  @Public()
  async deleteManufacturer(
    @Context() context: GqlContext,
    @Args() { input }: DeleteManufacturerInput
  ): Promise<ManufacturerDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc.deleteManufacturer(
      {
        // @ts-ignore
        id: input.id
      },
      grpcContext
    ).toPromise()
  }
}
