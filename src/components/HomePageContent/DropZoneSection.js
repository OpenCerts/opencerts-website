import React, { Component } from "react";
import PropTypes from "prop-types";
import CertificateDropzone from "../CertificateDropZone";
import css from "./dropZoneSection.scss";

class DropZoneSection extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    document.getElementById('demoDrop').addEventListener("drop", (e) => console.log("dropped here", e.dataTransfer.getData("isDemo")))
  }
  componentWillUnmount() {
    document.getElementById('demoDrop').removeEventListener("drop", () => console.log("dropped here"))
  }
  render() {
    const { handleCertificateChange } = this.props;
    return (
      <div
        className="row p-5 bg-brand-dark text-white"
      // style={{ boxShadow: "inset 0 0 50px 0 rgba(102, 120, 138, 0.2)" }}
      >
        <div className={css.main}>
          <div className="col-lg-5 col-md-12">
            <div className={css.description}>
              <h1>An easy way to check and verify your certificates</h1>
              <p>
                Whether you&#39;re a student or an employer, OpenCerts lets you
                verify the certificates you have of anyone from any institution. All
                in one place.
          </p>
            </div>
          </div>
          <div className="col-lg-7 col-md-12 col-sm-12" id="demoDrop">
            <CertificateDropzone
              handleCertificateChange={handleCertificateChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default DropZoneSection;

DropZoneSection.propTypes = {
  handleCertificateChange: PropTypes.func
};
