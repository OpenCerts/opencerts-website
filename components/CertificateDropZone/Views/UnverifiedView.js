import PropTypes from "prop-types";

const View = ({ handleRenderOverwrite }) => (
  <div className="text-center bg-light h-100 d-flex flex-column justify-content-center p-4">
    <div className="text-muted mb-3">Unverified!</div>
    <div
      className="p-3"
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        handleRenderOverwrite();
      }}
    >
      <i className="fas fa-download fa-10x text-muted" />
    </div>
  </div>
);

View.propTypes = {
  handleRenderOverwrite: PropTypes.func,
  document: PropTypes.object,

  issuerIdentityStatus: PropTypes.object,
  hashStatus: PropTypes.object,
  issuedStatus: PropTypes.object,
  notRevokedStatus: PropTypes.object
};

export default View;
