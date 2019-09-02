import React from "react";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import { getLogger } from "../../utils/logger";

// Need to dynamically import react-qr-reader as it access window directly
const QrReader = dynamic(import("react-qr-reader"), { ssr: false });

const { error } = getLogger("services:qr");

const QrReaderZone = ({ handleQrScanned }) => {
  const onScan = data => {
    if (data) handleQrScanned(data);
  };

  return (
    <QrReader
      data-id="qr-code-reader"
      delay={100}
      onError={error}
      onScan={onScan}
      style={{ width: "100%" }}
    />
  );
};

export default QrReaderZone;

QrReaderZone.propTypes = {
  handleQrScanned: PropTypes.func.isRequired
};
