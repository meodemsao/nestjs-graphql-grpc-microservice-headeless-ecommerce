import { INestApplication, Logger } from '@nestjs/common'
import { Transport } from '@nestjs/microservices'
import { join } from 'path'
import { BOOT, IBoot } from '@nestcloud/common'
import { AppUtils } from '@vg/common'

interface MicroserviceSetupOptions {
  enableMqtt?: boolean;
  enableNats?: boolean;
  hostname?: string;
}

export async function microserviceSetup(
  app: INestApplication,
  protoPath: string,
  options?: MicroserviceSetupOptions
) {

  console.log('protoPath............', protoPath)

  const { hostname = 'localhost', enableMqtt, enableNats } = options

  AppUtils.killAppWithGrace(app)

  const boot = app.get<IBoot>(BOOT)

  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      url: `${hostname}:${boot.get('service.port')}`,
      package: `${boot.get('service.name')}`,
      protoPath
    }
  }, { inheritAppConfig: true })

  if (enableMqtt) {
    app.connectMicroservice({
      transport: Transport.MQTT,
      options: {
        url: boot.get('mqtt.url'),
        clientId:
          boot.get('service.name') +
          Math.random().toString(16).substr(2, 8)
      }
    })
  }

  if (enableNats) {
    app.connectMicroservice({
      transport: Transport.NATS,
      options: {
        url: boot.get('nats.url'),
        queue: 'd4_srv_queue'
      }
    })
  }

  await app.startAllMicroservices()

  Logger.log(
    `GRPC ${boot.get(
      'service.name'
    )} running on port: ${boot.get('service.port')}`,
    'Bootstrap'
  )

  await app.listen(null)

  Logger.log(
    `REST ${boot.get(
      'service.name'
    )} running on: ${await app.getUrl()}`,
    'Bootstrap'
  )
}
