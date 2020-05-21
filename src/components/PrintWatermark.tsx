import React from "react";
const PrintWatermark: React.FunctionComponent = () => (
  <div
    style={{
      position: "absolute",
      opacity: 0.5,
      width: "100%",
      height: "100%",
      backgroundImage: 'url("/static/images/watermark.svg")',
      backgroundRepeat: "repeat",
    }}
  />
);

export default PrintWatermark;
