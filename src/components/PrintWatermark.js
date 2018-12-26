const STATEMENT =
  "Printed OpenCerts certificates cannot be verified. Please ask the certificate holder for their .opencert file. Visit opencerts.io for more information.";
const PrintWatermark = () => (
  <div
    className="print-only"
    style={{
      position: "fixed",
      top: 800,
      left: 0,
      width: "100%",
      height: "100%",
      opacity: 0.6,
      fontSize: "2em",
      zIndex: 1000,
      overflow: "hidden"
    }}
  >
    {STATEMENT}
  </div>
);

export default PrintWatermark;
