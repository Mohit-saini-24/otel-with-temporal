import fastify from 'fastify';
import { getTemporalClient } from '../temporal-service/client.js';
import { testWorkflow } from '../temporal-service/workflows.js';
import { temporalConfig } from '../temporal-service/config.js';
const server = fastify();

server.get('/generateTrace', async function (request, reply) {
    console.info('test2');
    let obj = {
        test:"test"
    }
    // const temporalClient = await getTemporalClient();
    // const handle = await temporalClient.workflow.start(testWorkflow, {
    //     taskQueue: temporalConfig.TASKQUEUE_NAME,
    //     workflowId: `test1-${new Date().getTime().toString()}`,
    //     args: [
    //         obj
    //     ],
    // });
    reply.send({ test2: "result" });
});
const start = async () => {
    try {
        await server.listen({ host: '0.0.0.0', port: 5001 });
        console.info("server running");
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};
start();
