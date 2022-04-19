import { NestFactory } from '@nestjs/core'
import { Logger } from '@nestjs/common'
import * as getPort from 'get-port'
import { AppModule } from './app.module'
import { BOOT, IBoot } from '@nestcloud/common'
import {
	AppUtils,
	corsOptions,
	// setupSwagger
} from '@vg/common'
import { tracer } from '@vg/core'

async function bootstrap() {
	tracer('service-notification')

	const app = await NestFactory.create(AppModule)

	const boot = app.get<IBoot>(BOOT);

	app.enableCors(corsOptions)
	AppUtils.killAppWithGrace(app)

	// const document = SwaggerModule.createDocument(app, setupSwagger())
	// SwaggerModule.setup('docs', app, document)

	const port = await getPort()
	await app.listen(boot.get('service.port', port))
	Logger.log(`${boot.get('service.name')} running on: ${await app.getUrl()}`, 'Bootstrap')
}

(async () => await bootstrap())()
