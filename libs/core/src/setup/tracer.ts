import opentelemetry from '@opentelemetry/api'
import { registerInstrumentations } from '@opentelemetry/instrumentation'
import { SimpleSpanProcessor, ConsoleSpanExporter } from '@opentelemetry/sdk-trace-base'
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node'
import { Resource } from '@opentelemetry/resources'
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions'
import { JaegerExporter } from '@opentelemetry/exporter-jaeger'
import { ZipkinExporter } from '@opentelemetry/exporter-zipkin'
import { GrpcInstrumentation } from '@opentelemetry/instrumentation-grpc'
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http'

const EXPORTER = process.env.EXPORTER || 'jaeger'

export const tracer = (serviceName) => {
	const provider = new NodeTracerProvider({
		resource: new Resource({
			[SemanticResourceAttributes.SERVICE_NAME]: serviceName
		})
	})

	let exporter
	if (EXPORTER.toLowerCase().startsWith('z')) {
		exporter = new ZipkinExporter()
	} else {
		exporter = new JaegerExporter()
	}

	provider.addSpanProcessor(new SimpleSpanProcessor(exporter))

	// Initialize the OpenTelemetry APIs to use the NodeTracerProvider bindings
	provider.register()

	registerInstrumentations({
		instrumentations: [
			new GrpcInstrumentation(),
			new HttpInstrumentation()
		]
	})

	return opentelemetry.trace.getTracer(serviceName)
}
