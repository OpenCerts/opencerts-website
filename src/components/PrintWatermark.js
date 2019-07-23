const PrintWatermark = () => (
  <div className="print-only">
    <img
      style={{
        position: "absolute",
        opacity: 0.5,
        width: "100%",
        height: "100%"
      }}
      src="/static/images/watermark.svg"
    />
  </div>
);

export default PrintWatermark;
