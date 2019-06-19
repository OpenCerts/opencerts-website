import PropTypes from "prop-types";
import {
  renderLogoITEandPartner,
  renderCOM,
  renderCOMAwardText,
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
      {renderCOM()}
      {renderCOMAwardText(certificate)}
      {renderTwoNiecSignatures(certificate)}
      {renderITEFooter(certificate)}
      <p />
    </div>
  </div>
);

Template.propTypes = {
  certificate: PropTypes.object.isRequired
};
export default Template;
