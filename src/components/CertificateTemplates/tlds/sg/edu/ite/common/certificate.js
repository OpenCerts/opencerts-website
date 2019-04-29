import { get } from "lodash";
import { IMG_CERTIFICATE_SEAL, IMG_CERT_FULL1_LOGO_ITE, IMG_CERT_NIEC1_LOGO_ITE, IMG_CERT_NIEC1ITE_LOGO_ITE } from "./images";
import {
  formatDate,
  formatDatePrefix,
  formatCertName,
  formatCertID
} from "./functions";

export const fullWidthStyle = {
  width: "100%",
  height: "auto"
};

export const halfWidthStyle = {
  width: "55%",
  height: "auto"
};

export const threeqartWidthStyle = {
  width: "75%",
  height: "auto"
};

export const arial16Pt = {
  fontFamily: "Arial",
  fontSize: "24px",
  textAlign: "center"
};

export const arial10Pt = {
  fontFamily: "Arial",
  fontSize: "16px",
  textAlign: "center",
  marginTop : "0",
  marginBottom : "0",
  marginLeft :"0",
  marginRight :"0"
};

export const arial5Pt = {
  fontFamily: "Arial",
  fontSize: "15px",
  textAlign: "start",
  marginTop : "0",
  marginBottom : "0"
};


export const timesNewRoman24Pt = {
  fontFamily: "Times New Roman",
  fontSize: "16px",
  fontWeight: "bold",
  textAlign: "center",
  color: "black",
  marginTop : "0",
  marginBottom :"0"
};

export const timesNewRoman32Pt = {
  fontFamily: "Times New Roman",
  fontSize: "42px",
  fontStyle: "italic",
  fontWeight: "bold",
  textAlign: "center",
  color: "black",
  marginTop : "0",
  marginBottom :"0"
};

export const printTextStyle = {
  fontFamily:"TimesNewRoman",
  fontStyle :"Italic", 
  fontWeight: "500!important",
  fontSize: "1.2rem",
  color: "#555",
  textAlign: "center"
};

export const COMTextStyle = {
  fontFamily:"Arial",
  color: "#111",
  fontSize: "5.0rem",
  fontWeight: "bold",
};

export const nameTextStyle = {
  fontSize: "3rem",
  textAlign: "center"
};

export const titleTextStyle = {
  color: "rgb(30,93,200)",
  fontSize: "3rem",
  textAlign: "center"
};


export const renderCOM = () => (
  <div
    className="row d-flex justify-content-center"
    style={{ marginTop: "6rem" }}
  >
    <p style={COMTextStyle}>Certificate of Merit</p>
  </div>
);

export const renderLogoITE = () => (
  <div className="row d-flex justify-content-center">
    <div className="col-1" />
    <div className="col-10">
      <img style={halfWidthStyle} src={IMG_CERT_FULL1_LOGO_ITE} />
    </div>
    <div className="col-1" />
  </div>
);

export const renderLogoITEandPartner = logo => (
  <div
    className="row d-flex justify-content-start align-items-end"
    style={{ marginTop: "3rem" }}
  >
    <div className="col-1" />
    <div className="col-5">
      <img style={fullWidthStyle} src={IMG_CERT_NIEC1_LOGO_ITE} />
    </div>
	<div className="col-5">
      <img style={fullWidthStyle} src={IMG_CERT_NIEC1ITE_LOGO_ITE} />
    </div>
    <div className="col-1" />
  </div>
);

export const renderTwoSignatures = certificate => (
  <div
    className="row d-flex justify-content-center align-items-center"
    style={{ marginTop: "8rem", marginBottom: "1rem" }}
  >
    <div className="col-4 justify-content-center">
	 <div className="row d-flex justify-content-center">	
      <img style={threeqartWidthStyle} src={IMG_CERTIFICATE_SEAL} />
    </div>
	</div>

    <div className="col-4 justify-content-center"
	  style={{ marginTop: "4rem", marginBottom: "0" }} >
      <div className="px-4">
        <img
          style={fullWidthStyle}
          src={get(certificate, "additionalData.certSignatories[0].signature")}
        />

      </div>
      <div className="text-center"><strong>
        <p style={arial10Pt}>{get(certificate, "additionalData.certSignatories[0].designation")}</p>
		</strong>
      </div>
    <p>
      <br />
	  <br />
	  <br />
    </p>
    </div>

    <div className="col-4 justify-content-center"
	  style={{ marginTop: "4rem", marginBottom: "0" }} >
      <div className="px-4">
        <img
          style={fullWidthStyle}
          src={get(certificate, "additionalData.certSignatories[1].signature")}
        />

      </div>
      <div className="text-center"><strong>
        <p style={arial10Pt}>{get(certificate, "additionalData.certSignatories[1].designation")}</p>
		</strong>
      </div>
	  <p>
      <br />
      <br />
      </p>
	  <div className="text-center">
	  <p style={timesNewRoman24Pt}>{get(certificate, "additionalData.certNbr")}</p>
       </div>
    </div>
  </div>
);



export const renderTwoNiecSignatures = certificate => (
  <div
    className="row d-flex justify-content-center"
    style={{ marginTop: "8rem", marginBottom: "0" }}
  >
    <div className="col-4 justify-content-center">
	 <div className="row d-flex justify-content-center">
      <img style={threeqartWidthStyle} src={IMG_CERTIFICATE_SEAL} />
	 </div>
    </div>
    <div className="col-4 justify-content-center"
	style={{ marginTop: "4rem", marginBottom: "0" }} >
      <div className="px-4">
        <img
          style={fullWidthStyle}
          src={get(certificate, "additionalData.certSignatories[0].signature")}
        />
      </div>
      <div className="text-center"><strong>
	  <p style={arial10Pt}>{get(certificate, "additionalData.certSignatories[0].designation")}</p>
		</strong>
      </div>
	    <div className="text-center"><strong>
        <p style={arial10Pt}>{get(certificate, "additionalData.certSignatories[0].organisation").substring(0,21)}</p>
		</strong>
		</div>
		<div className="text-center"><strong>
		<p style={arial10Pt}>{get(certificate, "additionalData.certSignatories[0].organisation").substring(22,49)}</p>
		</strong>
		</div>
    <p>
      <br />
    </p>
    </div>

    <div className="col-4 justify-content-center"
	style={{ marginTop: "4rem", marginBottom: "0" }} >
      <div className="px-4">
        <img
          style={fullWidthStyle}
          src={get(certificate, "additionalData.certSignatories[1].signature")}
        />
      </div>
      <div className="text-center"><strong>
        <p style={arial10Pt}>{get(certificate, "additionalData.certSignatories[1].designation")}</p>
		</strong>
      </div>
      <div className="text-center"><strong>
        <p style={arial10Pt}>{get(certificate, "additionalData.certSignatories[1].organisation")}</p>
	   </strong>
      </div>	  
	  <p>
      <br />
      </p>
	  <div className="text-center"><strong>
	  <p style={timesNewRoman24Pt}>{get(certificate, "additionalData.certNbr")}</p>
		</strong>
       </div>
    </div>
  </div>
);

const renderAwardText = certificate => (
  <div>
    <div
      className="row d-flex justify-content-center"
      style={{ marginTop: "10rem" }}
    >
	  <span style={arial16Pt}>It is hereby certified that</span>
    </div>
	<div class="ml-3"><div class="mr-3">
    <div className="row d-flex justify-content-center">
      <span style={timesNewRoman32Pt}>{certificate.recipient.name}</span>
    </div>
	</div>  </div>
	<div className="row d-flex justify-content-center">
      <span style={arial10Pt}>
        __________________________________________________________________________________________
      </span>
	</div>
    <p>
      <br />
    </p>	
    <div className="row d-flex justify-content-center">
      <span style={arial16Pt}>
        having successfully completed the programme of study
      </span>
	</div>  
	<div className="row d-flex justify-content-center">
	<span style={arial16Pt}>
        and passed the prescribed examinations
      </span>
	</div>
	<div className="row d-flex justify-content-center">
	<span style={arial16Pt}>
		was awarded the
      </span>
    </div>
    <p>
      <br />
    </p>
	<div class="ml-5"><div class="mr-5">
    <div className="row d-flex justify-content-center">
      <span style={timesNewRoman32Pt}>
        <p style={timesNewRoman32Pt}>{certificate.additionalData.certDescr1}</p>
      </span>
    </div>
	</div>  </div>	
	<div class="ml-5"><div class="mr-5">
    <div className="row d-flex justify-content-center">
      <span style={timesNewRoman32Pt}>
        <p style={timesNewRoman32Pt}>{certificate.additionalData.certDescr2}</p>
      </span>
    </div>
	</div>  </div>	
	<div class="ml-5"><div class="mr-5">
	<div className="row d-flex justify-content-center">
      <span style={timesNewRoman32Pt}>
        <p style={timesNewRoman32Pt}>{certificate.additionalData.certDescr3}</p>
      </span>
    </div>
	</div>  </div>	
	<div class="ml-5"><div class="mr-5">
	<div className="row d-flex justify-content-center">
	<span style={timesNewRoman32Pt}>
        <p style={timesNewRoman32Pt}>{certificate.additionalData.certDescr4}</p>
    </span>
	</div>
	</div>  </div>	
		<div className="row d-flex justify-content-center">
	<span style={arial16Pt}>
        on
      </span>
	</div>
		<div className="row d-flex justify-content-center">
	<span style={timesNewRoman32Pt}>
        <p style={timesNewRoman32Pt}>{certificate.additionalData.confDate}</p>
    </span>
	</div>
  </div>
);


export const renderIssuingDate = certificate => (
  <div>
    <p>
      {formatDatePrefix(certificate.issuedOn)}{" "}
      {formatDate(certificate.issuedOn)}
    </p>
  </div>
);

export const renderFooter = certificate => (
  <div className="container">
    <div className="row d-flex justify-content-center">
      <div className="col-6 text-left">
        {get(certificate, "additionalData.additionalCertId")}
      </div>
      <div className="col-6 text-right">{formatCertID(certificate.id)}</div>
    </div>
  </div>
);

/* eslint-disable */
// Disabled eslint as there's no way to add proptypes to an anonymous function like this
export default ({ logo }) => ({ certificate }) => (
  <div>
    <div
      className="container"
      style={{ border: 5, borderColor: "#AAA", borderStyle: "solid" }}
    >
      {logo ? renderLogoITEandPartner(logo) : renderLogoITE()}
      {renderAwardText(certificate)}
      {certificate.additionalData.certSignatories &&
      certificate.additionalData.certSignatories[2]
        ? renderThreeSignatures(certificate)
        : renderTwoSignatures(certificate)}
	  {renderITEFooter(certificate)}
    </div>
  </div>
);
