import { Module } from '@nestjs/common'
import {
	CoreModule,
	ServiceRegistryModule
} from '@vg/core'
import { EmailModule } from './email/email.module'

@Module({
	imports: [
		ServiceRegistryModule,
		CoreModule,
		EmailModule
	],
	controllers: [],
	providers: []
})
export class AppModule {
}
