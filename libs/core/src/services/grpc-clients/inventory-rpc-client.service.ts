import { Injectable } from '@nestjs/common'
import { GrpcClient, RpcClient, Service } from '@nestcloud/grpc'
import { InventoryServiceClient } from '@vg/proto-schema'
import { SERVICE_LIST } from '@vg/core/constants'

@Injectable()
export class InventoryRpcClientService {
  @RpcClient({
    service: SERVICE_LIST.inventory.consulName,
    package: SERVICE_LIST.inventory.package,
    protoPath: SERVICE_LIST.inventory.protoPath
  })
  private readonly client: GrpcClient

  @Service(SERVICE_LIST.inventory.service, {
    service: SERVICE_LIST.inventory.consulName,
    package: SERVICE_LIST.inventory.package,
    protoPath: SERVICE_LIST.inventory.protoPath
  })
  public svc: InventoryServiceClient<any>
}
