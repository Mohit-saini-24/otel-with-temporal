import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter as OTLPTraceExporterGrpc } from '@opentelemetry/exporter-trace-otlp-grpc';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { resourceFromAttributes } from '@opentelemetry/resources';

function setupTraceExporter(){
  return new OTLPTraceExporterGrpc({
    url : 'http://localhost:4317'
  })
}
export const resource = resourceFromAttributes({
  [ATTR_SERVICE_NAME] : "temporal-trace"
})

export const traceExporter = setupTraceExporter();
export const otelSdk = new NodeSDK({
  resource,
  traceExporter,
  instrumentations : [getNodeAutoInstrumentations()]
  // spanProcessors: [new SimpleSpanProcessor(new ConsoleSpanExporter())],
})
otelSdk.start();