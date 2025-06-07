import { proxyActivities } from "@temporalio/workflow";
import {
    OpenTelemetryInboundInterceptor,
    OpenTelemetryOutboundInterceptor,
    OpenTelemetryInternalsInterceptor,
  } from '@temporalio/interceptors-opentelemetry/lib/workflow/index.js';
const {
    testActivity,
    activity2,
    sleepms
} = proxyActivities({
    startToCloseTimeout : "10s",
    // retry:{
    //     maximumAttempts : 1
    // }
})
const testWorkflow = async (input) => {
    console.log(input)
    const activityResult = await testActivity({"test":"test"});
    console.log("activity complete ", activityResult);
    // await activity2();
    // throw new Error("injected error")
    await sleepms(2000);
    return {success:"success"};
}
const interceptors = () => ({
    inbound: [new OpenTelemetryInboundInterceptor()],
    outbound: [new OpenTelemetryOutboundInterceptor()],
    internals: [new OpenTelemetryInternalsInterceptor()],
  });
export {
    testWorkflow,
    interceptors
}