import PropTypes from "prop-types";
import { EchelonLogo, E27Logo, ApacLogo } from "./resources";

const Template = ({ certificate, document }) => {
  const scaleValue = window.innerWidth / 595;
  const translateX = (scaleValue - 1.06) * 50;
  const translateY = (scaleValue - 1.07) * 50;
  return (
    <div
      style={{
        backgroundColor: "white",
        textAlign: "center",
        height: 842,
        width: 595,
        position: "relative",
        boxShadow: "0 2px 8px rgba(31,45,61,.05)",
        transform: `translate(${translateX}%, ${translateY}%) scale(${scaleValue})`
      }}
    >
      <div
        style={{
          backgroundColor: "#2F166F",
          height: 232,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          paddingTop: 64.22,
          marginBottom: 4
        }}
      >
        <EchelonLogo />
        <div
          style={{
            color: "#FFFFFF",
            fontSize: 36,
            height: 96,
            fontWeight: 700,
            lineHeight: "48px",
            width: 514,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end"
          }}
        >
          Certificate of Participation
        </div>
      </div>
      <div>
        <div style={{ marginTop: 32 }}>
          <div
            style={{
              color: "#8497A9",
              height: "20px",
              fontSize: 16,
              fontWeight: 400,
              width: "100%",
              marginBottom: 8
            }}
          >
            presented to
          </div>
          <div
            style={{
              color: "#000000",
              fontSize: "20px",
              fontWeight: 400,
              height: 24,
              width: "100%"
            }}
          >
            Name of participant
          </div>
        </div>
        <div style={{ marginTop: 32 }}>
          <div
            style={{
              color: "#8497A9",
              height: "20px",
              fontSize: 16,
              fontWeight: 400,
              width: "100%",
              marginBottom: 8
            }}
          >
            by
          </div>
          <div
            style={{
              color: "#000000",
              fontSize: "20px",
              fontWeight: 400,
              height: 24,
              width: "100%"
            }}
          >
            e27
          </div>
        </div>
        <div style={{ marginTop: 32 }}>
          <div
            style={{
              color: "#8497A9",
              height: "20px",
              fontSize: 16,
              fontWeight: 400,
              width: "100%",
              marginBottom: 8
            }}
          >
            for
          </div>
          <div
            style={{
              color: "#000000",
              fontSize: "20px",
              fontWeight: 400,
              height: 24,
              width: "100%"
            }}
          >
            Echelon Asia Summit 2019
          </div>
        </div>
        <div style={{ marginTop: 32 }}>
          <div
            style={{
              color: "#8497A9",
              height: "20px",
              fontSize: 16,
              fontWeight: 400,
              width: "100%",
              marginBottom: 15
            }}
          >
            participating as
          </div>
          <div
            style={{
              color: "#000000",
              fontSize: "20px",
              fontWeight: 400,
              height: 40,
              width: "100%"
            }}
          >
            Top 100 Finalist
          </div>
        </div>
        <div style={{ marginTop: 32 }}>
          <div
            style={{
              color: "#8497A9",
              height: "20px",
              fontSize: 16,
              fontWeight: 400,
              width: "100%",
              marginBottom: 11
            }}
          >
            Blockchain proof
          </div>
          <div
            style={{
              color: "#000000",
              fontSize: "16px",
              fontWeight: 400,
              height: 40,
              width: 260,
              wordWrap: "break-word",
              margin: "auto"
            }}
          >
            {document.signature.merkleRoot}
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 27, width: "100%" }}>
        <E27Logo />
        <img
          src={ApacLogo}
          style={{ marginLeft: 32, width: 53, height: 49.4 }}
        />
        <img
          src={certificate.additionalData.qr}
          style={{ width: 80, height: 80, marginLeft: 283 }}
        />
      </div>
    </div>
  );
};

Template.propTypes = {
  certificate: PropTypes.object.isRequired,
  document: PropTypes.object.isRequired
};
export default Template;
