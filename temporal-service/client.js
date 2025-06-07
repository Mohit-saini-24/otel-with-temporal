import { Connection, Client } from "@temporalio/client";
import { temporalConfig } from "./config.js";
import { OpenTelemetryWorkflowClientInterceptor } from '@temporalio/interceptors-opentelemetry';

let connection = null;

export const getTemporalClient = async () => {
	const TEMPORAL_URL = temporalConfig.TEMPORAL_URL;
	// If a connection already exists, reuse it
	if (!connection) {
		connection = await Connection.connect({ address: TEMPORAL_URL });
	}

	// Always create a new client instance for each request
	const client = new Client({
		connection,
		namespace: temporalConfig.NAMESPACE,
		// Registers OpenTelemetry Tracing interceptor for Client calls
		interceptors: {
			workflow: [new OpenTelemetryWorkflowClientInterceptor()],
		},
	});

	return client;
};
