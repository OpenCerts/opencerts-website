import PropTypes from "prop-types";
import {
  renderLogoRP,
  renderAwardText,
  renderTwoSignatures,
  renderFooter
} from "../common/certificate";

const Template = ({ certificate }) => (
  <div>
    <div
      className="container"
      style={{ border: 0, borderColor: "#AAA", borderStyle: "solid" }}
    >
      {renderLogoRP()}
      {renderAwardText(certificate)}
      {renderTwoSignatures(certificate)}
    </div>
    {renderFooter(certificate)}
  </div>
);

Template.propTypes = {
  certificate: PropTypes.object.isRequired
};
export default Template;
