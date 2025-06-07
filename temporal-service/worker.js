import { NativeConnection, DefaultLogger, Worker, Runtime, makeTelemetryFilterString } from '@temporalio/worker';
import {
    OpenTelemetryActivityInboundInterceptor,
    OpenTelemetryActivityOutboundInterceptor,
    makeWorkflowExporter,
} from '@temporalio/interceptors-opentelemetry/lib/worker/index.js';

import path from "path";
import { temporalConfig } from "./config.js";
import activities from "./activities.js"

const __dirname = path.resolve();
// function initializeRuntime(){
//     Runtime.install({
//         // logger: new DefaultLogger('WARN'),
//         telemetryOptions: {
//             logging: {
//                 forward: {},
//                 // filter: makeTelemetryFilterString({ core: 'INFO', other: 'INFO' }),
//             },
//         }
//     })
// }

async function run(){
    // initializeRuntime();
    const connection = await NativeConnection.connect({
		address: temporalConfig.TEMPORAL_URL,
	});
    const worker = await Worker.create({
        connection,
        namespace : temporalConfig.NAMESPACE,
        taskQueue: temporalConfig.TASKQUEUE_NAME,
        workflowsPath: path.join(__dirname, "workflows.js"),
        activities,
        sinks: {
            exporter :  {
                export: {
                    fn: (info, spanData) => {}
                }
            }
        },
        interceptors: {
            workflowModules: [path.join(__dirname, "workflows.js")],
            activity: [
                (ctx) => ({
                    inbound: new OpenTelemetryActivityInboundInterceptor(ctx),
                    outbound: new OpenTelemetryActivityOutboundInterceptor(ctx)
                })
            ]
        }
    })
    await worker.run();
}
run();