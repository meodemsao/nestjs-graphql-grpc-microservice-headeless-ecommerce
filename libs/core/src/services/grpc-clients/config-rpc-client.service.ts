import { Injectable } from '@nestjs/common'
import { GrpcClient, RpcClient, Service } from '@nestcloud/grpc'
import { ConfigServiceClient } from '@vg/proto-schema'
import { SERVICE_LIST } from '@vg/core/constants'

@Injectable()
export class ConfigRpcClientService {
  @RpcClient({
    service: SERVICE_LIST.config.consulName,
    package: SERVICE_LIST.config.package,
    protoPath: SERVICE_LIST.config.protoPath
  })
  private readonly client: GrpcClient

  @Service(SERVICE_LIST.config.service, {
    service: SERVICE_LIST.config.consulName,
    package: SERVICE_LIST.config.package,
    protoPath: SERVICE_LIST.config.protoPath
  })
  public svc: ConfigServiceClient<any>
}
