import { SIT_CERT_BG, SIT_CERT_LOGO, SIT_CERT_SEAL, SIT_PRESIDENT, SIT_DEP_PRESIDENT } from "./images";

const fullWidthStyle = {
	width: "100%",
	height: "auto"
};
const garamondItalic18Pt = {
	fontFamily: "Garamond",
	fontSize: "24px",
	fontStyle: "italic",
	textAlign: "center",
	color: "black"
};

const timesNewRoman18Pt = {
	fontFamily: "Times New Roman",
	fontSize: "24px",
	fontWeight: "bold",
	textAlign: "center",
	color: "black"
};

const timesNewRoman18PtRed = {
	fontFamily: "Times New Roman",
	fontSize: "24px",
	fontWeight: "bold",
	textAlign: "center",
	color: "red"
};

const helvetica12Pt = {
	fontFamily: "Helvetica",
	fontSize: "16px",
	textAlign: "center",
	color: "black"
};

const borderImgStyle = { 
	backgroundSize: "100% 100%",
	backgroundRepeat: "no-repeat",
	backgroundImage: "url(" + SIT_CERT_BG + ")",
	width: "100%",
	height: "auto"
}

const logoImgStyle = { 
	width: "268px",
	height: "130px"
}

const sealImgStyle = { 
	width: "180px",
	height: "180px"
}

const Template = certificate => (
  <div>
    <div className="container" style={ borderImgStyle } >
	  <div className="row d-flex justify-content-center" style={{ marginTop: "2rem" }}>&nbsp;</div>
	  <div className="row d-flex justify-content-center" style={{ marginTop: "2rem" }}>
			<img src={SIT_CERT_LOGO} style={logoImgStyle} />
      </div>
	  <div className="row d-flex justify-content-center" style={{ marginTop: "2rem" }}>
        <p style={garamondItalic18Pt}>This is to certify that</p>
      </div>
      <div className="row d-flex justify-content-center">
        <span style={timesNewRoman18Pt}>{certificate.recipient.name}</span>
      </div>
      <div className="row d-flex justify-content-center">
        <span style={garamondItalic18Pt}>
			having fulfilled the requirements of the University was conferred the degree of
		</span>
      </div>
      <div className="row d-flex justify-content-center">&nbsp;</div>
      <div className="row d-flex justify-content-center">
        <span style={timesNewRoman18PtRed}>{certificate.additionalData.degreeName1}</span>
      </div>
      <div className="row d-flex justify-content-center">
		<span style={timesNewRoman18PtRed}>{certificate.additionalData.degreeName2}</span>
      </div>
      <div className="row d-flex justify-content-center">
        <p style={garamondItalic18Pt}>
			{certificate.additionalData.degreeName3}
			<br/>
			on {certificate.additionalData.confDate}
		</p>
      </div>
	  {certificate.additionalData.degreeName2.length == 0 &&
		  <div className="row d-flex justify-content-center">
			<span style={timesNewRoman18PtRed}>&nbsp;</span>
		  </div>
	  }
	  <div className="row" style={{ marginTop: "1rem" }}>
		<div className="col-md-1">&nbsp;</div>
		<div className="col-md-4 text-center">
			<br/>
			<img src={SIT_CERT_SEAL} style={sealImgStyle} />
		</div>
		<div className="col-md-2">&nbsp;</div>
		<div className="col-md-4">
			<div className="row">
				<div className="col-md-12 text-center">
					<img src={SIT_PRESIDENT} />
				</div>
			</div>
			<div className="row">
				<div className="col-md-12 text-center">
					<span style={helvetica12Pt}>President</span>
				</div>
			</div>
			<div className="row">
				<div className="col-md-12 text-center">
					<img src={SIT_DEP_PRESIDENT} />
				</div>
			</div>
			<div className="row">
				<div className="col-md-12 text-center">
					<span style={helvetica12Pt}>Deputy President (Academic) & Provost</span>
				</div>
			</div>
		</div>
		<div className="col-md-1">&nbsp;</div>
	  </div>
	  <div className="row d-flex justify-content-center" style={{ marginTop: "2rem" }}>&nbsp;</div>
    </div>
  </div>
);

export default Template;
