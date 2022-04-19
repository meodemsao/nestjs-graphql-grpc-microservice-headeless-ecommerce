import { Injectable } from '@nestjs/common'
import { Client, ClientGrpc, GrpcOptions, Transport } from '@nestjs/microservices'
import { SERVICE_LIST } from '@vg/core/constants/service.constants'

@Injectable()
export class NestGrpcClientFactory {
  @Client(generateGrpcOptions(SERVICE_LIST.catalog.url, SERVICE_LIST.catalog.package, SERVICE_LIST.catalog.protoPath))
  public readonly serviceCatalog: ClientGrpc

}

export function generateGrpcOptions(url: string, packageName: string, protoPath: string): GrpcOptions {
  return {
    transport: Transport.GRPC,
    options: {
      url,
      package: packageName,
      protoPath,
      loader: {
        arrays: true
      }
    }
  }
}