import PropTypes from "prop-types";
import { MultiCertificateRenderer } from "template-utils/MultiCertificateRenderer";
import { approvedAddresses } from "../common";
import ITECert from "./certificate";

const templates = [
  {
    id: "certificate",
    label: "Certificate",
    template: ITECert
  }
];

const ITE2019COMCERTNIEC1 = ({ certificate }) => (
  <MultiCertificateRenderer
    certificate={certificate}
    templates={templates}
    whitelist={approvedAddresses}
  />
);

ITE2019COMCERTNIEC1.displayName = "ITE-2019-FUL-CERT-FULL1 Template";
ITE2019COMCERTNIEC1.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default ITE2019COMCERTNIEC1;
