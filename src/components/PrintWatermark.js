const STATEMENT =
  "Digital signature not valid on printed certificate. To send a certificate use the send function provided ";
const PrintWatermark = () => (
  <div
    className="print-only"
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      opacity: 0.2,
      fontSize: "3em",
      zIndex: 1000,
      overflow: "hidden"
    }}
  >
    {STATEMENT.repeat(50)}
  </div>
);

export default PrintWatermark;
