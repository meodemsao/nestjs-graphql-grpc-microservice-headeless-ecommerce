import { Injectable } from '@nestjs/common'
import { GrpcClient, RpcClient, Service } from '@nestcloud/grpc'
import { CatalogServiceClient } from '@vg/proto-schema'
import { SERVICE_LIST } from '@vg/core/constants'

@Injectable()
export class CatalogRpcClientService {
  @RpcClient({
    service: SERVICE_LIST.catalog.consulName,
    package: SERVICE_LIST.catalog.package,
    protoPath: SERVICE_LIST.catalog.protoPath
  })
  private readonly client: GrpcClient

  @Service(SERVICE_LIST.catalog.service, {
    service: SERVICE_LIST.catalog.consulName,
    package: SERVICE_LIST.catalog.package,
    protoPath: SERVICE_LIST.catalog.protoPath
  })
  public svc: CatalogServiceClient<any>
}
