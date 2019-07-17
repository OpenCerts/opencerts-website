const STATEMENT =
  "Printed from the digital version of certificate. For verification, please visit OpenCerts.io (http://opencerts.io/) with the .opencert file.";
const PrintWatermark = () => (
  <div
    className="print-only"
    style={{
      position: "fixed",
      top: "50%",
      left: "50%",
      width: "100%",
      height: "100%",
      marginRight: "-50%",
      marginTop: "-50%",
      opacity: 0.15,
      fontSize: "4em",
      fontWeight: "900",
      zIndex: 1000,
      overflow: "hidden",
      transform: "rotate(300deg)",
      textAlign: "center"
    }}
  >
    {STATEMENT}
  </div>
);

export default PrintWatermark;
