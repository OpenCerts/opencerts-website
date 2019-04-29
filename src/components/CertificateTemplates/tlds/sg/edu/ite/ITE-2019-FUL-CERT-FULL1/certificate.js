import PropTypes from "prop-types";
import {
  renderLogoITE,
  renderTwoSignatures,
  renderFooter,
  fullWidthStyle,
  printTextStyle,
  nameTextStyle,
  titleTextStyle,
  arial16Pt,
  arial10Pt,
  arial5Pt,
  arial5PtMarLeft6,
  timesNewRoman32Pt  
  } from "../common/certificate";

export const formatDate = dateString => {
  if (!dateString) return null;
  const date = new Date(dateString);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getUTCFullYear();

  return (
    <p>
      {" "}
      {day} {months[month]} {year}
    </p>
  );
};


export const renderITEFooter = certificate => (
  <div className="container">
  <div
    className="row d-flex justify-content-start align-items-start"
    style={{ marginTop: "1rem" }}
  >
  <div className="col-1">
  </div>
    <div className="col-10 text-left">
	   	 <p style={arial5Pt}>{certificate.additionalData.footnote1}</p>
		<div class="ml-3"><div class="pl-4">
         <p style={arial5Pt}>{certificate.additionalData.footnote2}</p>
		</div></div>
         <br />
         <br />
	</div>
    <div className="col-1" >
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

const renderSignatures = certificate => (
  <div
    className="row d-flex justify-content-center align-items-end"
    style={{ marginTop: "8rem", marginBottom: "2rem" }}
  >
    <div className="col-1" />
    <div className="col-5">
      <div className="px-5">
        <div className="text-center">
          {formatDate(certificate.issuedOn)}
          <hr />
        </div>
      </div>
      <div className="text-center">Date</div>
      <div className="text-center">&nbsp;</div>
    </div>
    <div className="col-5">
      <div className="px-5">
        <img
          style={fullWidthStyle}
          src={certificate.additionalData.certSignatories[0].signature}
        />
        <hr />
      </div>
      <div className="text-center">
        {certificate.additionalData.certSignatories[0].name}
      </div>
      <div className="text-center">
        {certificate.additionalData.certSignatories[0].position}
      </div>
    </div>
    <div className="col-1" />
  </div>
);

const Template = ({ certificate }) => (
  <div>
    <div
      className="container"
      style={{ border: 5, borderColor: "#AAA", borderStyle: "solid" }}
    >
    <p>
      <br />
      <br />
    </p>
	  {renderLogoITE()}
      {renderAwardText(certificate)}
      {renderTwoSignatures(certificate)}
	  {renderITEFooter(certificate)}
    </div>
  </div>
);

Template.propTypes = {
  certificate: PropTypes.object.isRequired
};
export default Template;
