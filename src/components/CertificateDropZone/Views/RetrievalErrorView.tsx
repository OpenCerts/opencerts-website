import React from "react";
import { ErrorHeading, WhatShouldIDo, TryAnother } from "./UnverifiedView";

interface RetrievalErrorViewProps {
  resetData: () => void;
  retrieveCertificateByActionError: string;
}
export const RetrievalErrorView: React.FunctionComponent<RetrievalErrorViewProps> = ({
  resetData,
  retrieveCertificateByActionError,
}) => (
  <>
    <ErrorHeading title="The certificate can't be loaded" />

    <div className="text-pink mt-4 mb-4">
      <h4 className="font-bold">Unable to load certificate with the provided parameters</h4>
      <p className="break-words">{retrieveCertificateByActionError}</p>
    </div>

    <WhatShouldIDo />

    <TryAnother resetData={resetData} />
  </>
);
