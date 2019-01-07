const renderCertificateChange = handleCertificateChange => (
  <a href="/" onClick={() => handleCertificateChange(null)}>
    ← View another
  </a>
);

const InvalidCertificateNotice = () => (
  <div>
    {renderCertificateChange()}
    <div className="row my-3 p-4">INVALID CERTIFICATE!</div>
  </div>
);

export default InvalidCertificateNotice;
