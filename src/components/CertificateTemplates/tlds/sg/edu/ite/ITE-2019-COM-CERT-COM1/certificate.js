import PropTypes from "prop-types";
import {
  renderLogoITE,
  renderCOM,
  renderCOMAwardText,
  renderTwoSignatures,
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
      {renderLogoITE()}
      {renderCOM()}
      {renderCOMAwardText(certificate)}
      {renderTwoSignatures(certificate)}
      {renderITEFooter(certificate)}
    </div>
  </div>
);

Template.propTypes = {
  certificate: PropTypes.object.isRequired
};
export default Template;
