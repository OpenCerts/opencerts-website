import debug, { Debugger } from "debug";

// not using .extends because of stupid next.js resolve modules bug where its picking up old version of debug
export const trace = (namespace: string): Debugger => debug(`opencerts-website:trace:${namespace}`);
export const error = (namespace: string): Debugger => debug(`opencerts-website:error:${namespace}`);

export const getLogger = (namespace: string): { trace: Debugger; error: Debugger } => ({
  trace: trace(namespace),
  error: error(namespace),
});
