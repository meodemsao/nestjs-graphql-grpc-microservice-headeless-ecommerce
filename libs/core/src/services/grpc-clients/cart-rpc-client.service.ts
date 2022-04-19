import { Injectable } from '@nestjs/common'
import { GrpcClient, RpcClient, Service } from '@nestcloud/grpc'
import { CartServiceClient } from '@vg/proto-schema'
import { SERVICE_LIST } from '@vg/core/constants'

@Injectable()
export class CartRpcClientService {
  @RpcClient({
    service: SERVICE_LIST.cart.consulName,
    package: SERVICE_LIST.cart.package,
    protoPath: SERVICE_LIST.cart.protoPath
  })
  private readonly client: GrpcClient

  @Service(SERVICE_LIST.cart.service, {
    service: SERVICE_LIST.cart.consulName,
    package: SERVICE_LIST.cart.package,
    protoPath: SERVICE_LIST.cart.protoPath
  })
  public svc: CartServiceClient<any>
}
