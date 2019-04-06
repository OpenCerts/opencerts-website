import PropTypes from "prop-types";

const Recipient = ({ certificate }) => (
  <div className="container">
    <div className="row">
      <div className="col-7">
        <strong>{certificate.recipient.name}</strong>
        <br />
        {certificate.recipient.addressBlockHouseNumber}{" "}
        {certificate.recipient.addressStreetName}
        <br />
        {certificate.recipient.addressFloorNumber}{" "}
        {certificate.recipient.addressUnitNumber}
        <br />
        {certificate.recipient.addressCountry}
      </div>

      <div className="col-5">
        <div className="row">
          <div className="col-5">Identification No.</div>
          <div className="col-1"> : </div>
          <div className="col-5">{certificate.recipient.personIdNo}</div>
        </div>
        <div className="row">
          <div className="col-5">Admission No.</div>
          <div className="col-1"> : </div>
          <div className="col-5">
            {certificate.recipient.studentAdmissionNo}
          </div>
        </div>
        <div className="row">
          <div className="col-5">Date of Admission</div>
          <div className="col-1"> : </div>
          <div className="col-5">
            {new Date(certificate.admissionDate).toLocaleDateString("en-SG")}
          </div>
        </div>
        <div className="row">
          <div className="col-5">Date of Graduation</div>
          <div className="col-1"> : </div>
          <div className="col-5">
            {new Date(certificate.graduationDate).toLocaleDateString("en-SG")}
          </div>
        </div>
      </div>
    </div>

    <br />

    <div className="row">
      <div className="col-7">
        Course Name : &nbsp; {certificate.name.toUpperCase()}
      </div>
      <div className="col-5">
        <div className="row">
          <div className="col-5">Course Type</div>
          <div className="col-1"> : </div>
          <div className="col-5">{certificate.recipient.courseType}</div>
        </div>
      </div>
    </div>

    <br />
  </div>
);

Recipient.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default Recipient;
