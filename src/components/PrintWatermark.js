const PrintWatermark = () => (
  <div
    style={{
      position: "absolute",
      opacity: 0.5,
      width: "100%",
      height: "100%",
      backgroundImage: 'url("/static/images/watermark.svg")',
      backgroundRepeat: "repeat"
    }}
    className="print-only"
  />
);

export default PrintWatermark;
