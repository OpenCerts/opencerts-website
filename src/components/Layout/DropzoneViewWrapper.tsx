import React from "react";

export interface DropzoneViewWrapperProps {
  hover: boolean;
  accept: boolean;
  children: React.ReactNode;
}

export const DropzoneViewWrapper: React.FunctionComponent<DropzoneViewWrapperProps> = ({ hover, accept, children }) => (
  <div
    className={`rounded-2xl ${
      // eslint-disable-next-line no-nested-ternary
      accept ? (hover ? "bg-green-100" : "bg-blue-100") : "bg-pink-100"
    }`}
    data-testid="dropzone-view-wrapper"
  >
    <div className="p-2">
      <div className={`rounded-2xl border-2 border-dashed ie-fix-min-height ${accept ? "border-blue" : "border-pink"}`}>
        <div className="flex flex-wrap items-center" style={{ minHeight: "560px" }}>
          <div className="w-2/3 mx-auto">
            <div className="text-center">{children}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
