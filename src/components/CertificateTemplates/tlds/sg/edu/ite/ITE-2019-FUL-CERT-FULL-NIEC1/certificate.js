import PropTypes from "prop-types";
import {
  renderLogoITEandPartner,
  renderFullCertAwardText,
  renderTwoNiecSignatures,
  renderITEFooter
} from "../common/certificate";

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
      {renderLogoITEandPartner()}
      {renderFullCertAwardText(certificate)}
      {renderTwoNiecSignatures(certificate)}
      {renderITEFooter(certificate)}
    </div>
  </div>
);

Template.propTypes = {
  certificate: PropTypes.object.isRequired
};
export default Template;
