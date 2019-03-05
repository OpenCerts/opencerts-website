import PropTypes from "prop-types";
import { get } from "lodash";

import { getLogger } from "../utils/logger";
import templates from "./CertificateTemplates";

const { trace } = getLogger("components:CertificateViewer");

const FramelessCertificateViewer = props => {
  const { certificate, handleObfuscation } = props;

  const selectedTemplateName = get(certificate, "$template", "default");
  const SelectedTemplate = templates[selectedTemplateName] || templates.default;

  trace(`Templates Mapping: %o`, templates);
  trace(`Selected template: ${selectedTemplateName}`);
  trace(`Certificate content: %o`, certificate);

  return (
    <>
      <div>
        <SelectedTemplate
          certificate={certificate}
          handleObfuscation={handleObfuscation}
        />
      </div>
    </>
  );
};

FramelessCertificateViewer.propTypes = {
  handleCertificateChange: PropTypes.func,
  handleObfuscation: PropTypes.func,
  toggleDetailedView: PropTypes.func,
  detailedVerifyVisible: PropTypes.bool,
  document: PropTypes.object,
  certificate: PropTypes.object,
  verifying: PropTypes.bool,

  hashStatus: PropTypes.object,
  issuedStatus: PropTypes.object,
  notRevokedStatus: PropTypes.object,
  issuerIdentityStatus: PropTypes.object,
  showSharing: PropTypes.bool,
  emailSendingState: PropTypes.string,
  handleSharingToggle: PropTypes.func,
  handleSendCertificate: PropTypes.func
};

export default FramelessCertificateViewer;
