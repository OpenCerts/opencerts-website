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

const ITE2019COMCERT1 = () => (
  <MultiCertificateRenderer
    templates={templates}
    whitelist={approvedAddresses}
  />
);

ITE2019COMCERT1.displayName = "ITE-2019-COM-CERT-COM1 Template";
ITE2019COMCERT1.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default ITE2019COMCERT1;
