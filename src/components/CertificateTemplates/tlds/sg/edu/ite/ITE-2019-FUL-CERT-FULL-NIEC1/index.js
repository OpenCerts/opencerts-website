import PropTypes from "prop-types";
import MultiCertificateRenderer from "template-utils/MultiCertificateRenderer";
import { approvedAddresses } from "../common";
import ITECert from "./certificate";

const templates = [
  {
    id: "certificate",
    label: "Certificate",
    template: ITECert
  }
];

const ITE2019FULCERTNIEC1 = () => (
  <MultiCertificateRenderer
    templates={templates}
    whitelist={approvedAddresses}
  />
);

ITE2019FULCERTNIEC1.displayName = "ITE-2019-FUL-CERT-FULL-NIEC1 Template";
ITE2019FULCERTNIEC1.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default ITE2019FULCERTNIEC1;
