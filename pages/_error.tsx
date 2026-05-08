import * as Sentry from "@sentry/nextjs";
import Error from "next/error";
import React from "react";

const CustomErrorComponent = (props) => {
  return <Error statusCode={props.statusCode} />;
};

CustomErrorComponent.getInitialProps = async (contextData) => {
  // In case this is running in a serverless function, await this in order to give Sentry
  // time to send the error before the lambda exits
  try {
    await Sentry.captureUnderscoreErrorException(contextData);
  } catch (error) {
    // Silently fail - error page must render even if Sentry fails
    console.error('Failed to capture error in Sentry:', error);
  }

  // This will contain the status code of the response
  return Error.getInitialProps(contextData);
};

export default CustomErrorComponent;
