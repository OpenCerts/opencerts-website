import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CertificateDropzone from "../CertificateDropZone";
import css from "./dropZoneSection.scss";
import { updateCertificate } from "../../reducers/certificate";
import { trace } from "../../utils/logger";

const json = require("../CertificateTemplates/example/Demo-CertTemplate/DEMO_2019.json");

class DropZoneSection extends Component {
  componentDidMount() {
    document.getElementById("demoDrop").addEventListener("drop", e => {
      if (e.dataTransfer.getData("isDemo")) {
        this.handleChange();
      }
    });
  }

  componentWillUnmount() {
    document
      .getElementById("demoDrop")
      .removeEventListener("drop", () => this.removeListener());
  }

  removeListener = () => trace("drop listener removed");

  handleChange = () => this.props.updateCertificate(json);

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
                verify the certificates you have of anyone from any institution.
                All in one place.
              </p>
              <a
                className="btn btn-success btn-lg"
                role="button"
                href={`data:text/plain;,${JSON.stringify(json, null, 2)}`}
                download="demo.opencert"
                draggable="true"
                onDragStart={e => e.dataTransfer.setData("isDemo", true)}
              >
                Try Me: Drag me to DropZone
              </a>
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

const mapDispatchToProps = dispatch => ({
  updateCertificate: payload => dispatch(updateCertificate(payload))
});

export default connect(
  null,
  mapDispatchToProps
)(DropZoneSection);

DropZoneSection.propTypes = {
  handleCertificateChange: PropTypes.func,
  updateCertificate: PropTypes.func
};
