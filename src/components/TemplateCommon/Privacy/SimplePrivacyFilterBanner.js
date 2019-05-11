import React from "react";
import PropTypes from "prop-types";

const SimplePrivacyFilterBanner = ({ toggleEditable }) => (
  <div id="banner-privacy-filter" className="screen-only">
    <div
      className="row"
      style={{
        backgroundColor: "whitesmoke",
        padding: 20,
        marginBottom: 20
      }}
    >
      <div style={{ display: "inline-block" }}>
        <div className="h4">OpenCerts Privacy Filter Enabled</div>
        <div>
          Edit this certificate by removing sensitive information by clicking on
          the edit button. Downloaded certificate remains valid!
        </div>
      </div>
      <div
        className="ml-auto h5 pointer"
        style={{ display: "inline-block" }}
        onClick={toggleEditable}
      >
        <i className="far fa-edit" />
      </div>
    </div>
  </div>
);

SimplePrivacyFilterBanner.propTypes = {
  toggleEditable: PropTypes.func
};

export default SimplePrivacyFilterBanner;
