const noop = () => undefined;

const Sentry = {
  init: noop,
  replayIntegration: () => ({}),
  captureRouterTransitionStart: noop,
  captureRequestError: noop,
  captureUnderscoreErrorException: async () => undefined,
  captureException: noop,
  withScope: (callback) => {
    callback({
      setTag: noop,
      setContext: noop,
      setLevel: noop,
    });
  },
  withSentryConfig: (config) => config,
};

module.exports = Sentry;
