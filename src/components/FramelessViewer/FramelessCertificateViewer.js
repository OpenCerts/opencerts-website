import PropTypes from "prop-types";
import { get } from "lodash";

import { getLogger } from "../../utils/logger";
import templates from "../CertificateTemplates";

const { trace } = getLogger("components:CertificateViewer");

const FramelessCertificateViewer = props => {
  const {
    document,
    tabIndex,
    updateParentHeight,
    updateParentTemplates,
    obfuscateField
  } = props;

  const selectedTemplateName = get(document, "$template", "default");
  const SelectedTemplate = templates[selectedTemplateName] || templates.default;

  trace(`Templates Mapping: %o`, templates);
  trace(`Selected template: ${selectedTemplateName}`);
  trace(`Certificate content: %o`, document);

  return (
    <SelectedTemplate
      document={document}
      tabIndex={tabIndex}
      updateParentHeight={updateParentHeight}
      updateParentTemplates={updateParentTemplates}
      obfuscateField={obfuscateField}
    />
  );
};

FramelessCertificateViewer.propTypes = {
  document: PropTypes.object,
  tabIndex: PropTypes.number,
  updateParentHeight: PropTypes.func,
  updateParentTemplates: PropTypes.func,
  obfuscateField: PropTypes.func
};

export default FramelessCertificateViewer;
