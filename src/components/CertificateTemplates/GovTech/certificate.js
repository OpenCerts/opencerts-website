const Template = certificate => {
  console.log(certificate);
  return (
    <div
      style={{
        backgroundImage: "url('static/images/background.PNG')",
        backgroundSize: "cover",
        padding: "20px",
        textAlign: "center",
        border: "10px solid #787878"
      }}
    >
      <div
        style={{
          position: "relative",
          padding: "20px",
          textAlign: "center",
          margin: "auto",
          border: "5px solid #787878"
        }}
      >
        <img src="static/images/opencertslogo.svg" />
        <br />
        <br />
        <span
          style={{
            fontSize: "20px",
            marginTop: "30px"
          }}
        >
          <i>This is to certify that</i>
        </span>
        <br />
        <br />
        <span
          style={{
            fontSize: "35px"
          }}
        >
          <b>{JSON.parse(JSON.stringify(certificate.recipient.name))}</b>
        </span>
        <br />
        <br />
        <span
          style={{
            fontSize: "20px"
          }}
        >
          <i>has successfully completed the</i>
        </span>
        <br />
        <br />
        <span
          style={{
            fontSize: "35px"
          }}
        >
          Certified OpenCerts Associate
        </span>
        <br />
        <span
          style={{
            fontSize: "15px"
          }}
        >
          <i>certification through training administered by</i>
        </span>
        <br />

        <div className="container">
          <div className="row">
            <div className="col-sm">
              <img src="static/images/logo-govtech.png" />
            </div>
            <div
              className="col-sm"
              style={{
                marginTop: "60px"
              }}
            >
              <span
                style={{
                  fontSize: "18px",
                  float: "left"
                }}
              >
                ____________
              </span>
              <br />
              <span
                style={{
                  fontSize: "18px",
                  float: "left"
                }}
              >
                {certificate.additionalData.signatory}
              </span>
              <br />
              <span
                style={{
                  fontSie: "18px",
                  float: "left"
                }}
              >
                {certificate.additionalData.signatoryPosition}
              </span>
            </div>
          </div>
        </div>

        <br />
        <span
          style={{
            fontSize: "25px",
            position: "relative",
            float: "right",
            bottom: "20px",
            left: "14px"
          }}
        >
          Dated {certificate.issuedOn}
        </span>
      </div>
    </div>
  );
};

export default Template;
