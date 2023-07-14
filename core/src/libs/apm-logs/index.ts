import { RequestTracer } from "@cloudflare/workers-honeycomb-logger";

/**
 * 
 * @param tracer tracer from APM service
 * @param data content of the log
 * @param extraData extra data to add
 */
export default function logToAPM(tracer: RequestTracer, data: string, extraData?: object) {
  tracer?.log(data);

  if (extraData !== undefined) {
    tracer?.addData(extraData);
  }
}