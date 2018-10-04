import PropTypes from "prop-types";
import CertificateSharingForm from "./CertificateSharingForm";
import css from "./modal.scss";

const SharingModal = ({ show, handleSharingToggle, handleSendCertificate }) =>
  show ? (
    <div className={css.modal}>
      <div className={`${css["modal-content"]} p-3`}>
        <CertificateSharingForm handleSendCertificate={handleSendCertificate} />
      </div>
      <div
        style={{ position: "fixed", zIndex: 10 }}
        className="modal-backdrop fade show"
        onClick={() => handleSharingToggle()}
      />
    </div>
  ) : (
    ""
  );

export default SharingModal;

SharingModal.propTypes = {
  show: PropTypes.bool,
  handleSharingToggle: PropTypes.func,
  handleSendCertificate: PropTypes.func
};
