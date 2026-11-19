import React from "react";

export const VerifyingView: React.FunctionComponent = () => (
  <div className="text-blue" role="status">
    <i className="fas fa-spinner fa-pulse fa-3x" aria-hidden="true" />
    <p className="my-3">Verifying Certificate...</p>
  </div>
);
