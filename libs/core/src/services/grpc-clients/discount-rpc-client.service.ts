import { Injectable } from '@nestjs/common'
import { GrpcClient, RpcClient, Service } from '@nestcloud/grpc'
import { SERVICE_LIST } from '@vg/core/constants'
import { DiscountServiceClient } from '@vg/proto-schema'

@Injectable()
export class DiscountRpcClientService {
  @RpcClient({
    service: SERVICE_LIST.discount.consulName,
    package: SERVICE_LIST.discount.package,
    protoPath: SERVICE_LIST.discount.protoPath
  })
  private readonly client: GrpcClient

  @Service(SERVICE_LIST.discount.service, {
    service: SERVICE_LIST.discount.consulName,
    package: SERVICE_LIST.discount.package,
    protoPath: SERVICE_LIST.discount.protoPath
  })
  public svc: DiscountServiceClient<any>
}
