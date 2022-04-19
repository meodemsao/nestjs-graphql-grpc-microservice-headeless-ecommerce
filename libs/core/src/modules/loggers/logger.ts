import Pino from 'pino'
import { trace, context } from '@opentelemetry/api'

export const loggerOptions: Pino.LoggerOptions = {
	level: 'info',
	formatters: {
		level(label) {
			return { level: label }
		},
		log(object) {
			const span = trace.getSpan(context.active())
			if (!span) return { ...object }
			const { spanId, traceId } = trace
				.getSpan(context.active())
				?.spanContext()
			return { ...object, spanId, traceId }
		}
	},
	prettyPrint:
		process.env.NODE_ENV === 'local'
			? {
				colorize: true,
				levelFirst: true,
				translateTime: true
			}
			: false
}

export const logger: Pino.Logger = Pino(
	loggerOptions,
	Pino.destination(process.env.LOG_FILE_NAME)
)
