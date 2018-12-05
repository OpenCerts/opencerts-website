const members = [
  {
    name: "Government Technology Agency of Singapore (GovTech)",
    address: "0x007d40224f6562461633ccfbaffd359ebb2fc9ba",
    website: "https://www.tech.gov.sg",
    email: "info@tech.gov.sg",
    phone: "6211 2100"
  },
  {
    name: "Ngee Ann Polytechnic",
    address: "0xa5d801265D29A6F1015a641BfC0e39Ee3dA2AC76",
    website: "https://www.np.edu.sg",
    email: "asknp@np.edu.sg",
    phone: "6466 6555"
  }
];

const renderMembers = () =>
  members.map((m, i) => (
    <div key={i} className="col-6 mb-3">
      <h4>{m.name}</h4>
      {m.address ? <div>Certificate Store: <a href="https://etherscan.io/address/{m.address}">{m.address}</a></div> : ""}
      {m.website ? (
        <div>
          Website:{" "}
          <a href={m.website} target="_blank" rel="noopener noreferrer">
            {m.website}
          </a>
        </div>
      ) : (
        ""
      )}
      {m.email ? <div>Email: <a href="mailto:{m.email}">{m.email}</a></div> : ""}
      {m.phone ? <div>Phone: <a href="tel:{m.phone}">{m.phone}</a></div> : ""}
    </div>
  ));

const RegistryPage = () => (
  <div className="container-fluid">
    <div
      className="row bg-brand-dark text-white p-3"
      style={{ fontFamily: "sans-serif", fontWeight: 100 }}
    >
      <h1>Registry</h1>
    </div>
    <div
      className="row bg-brand-dark text-white"
      style={{ fontFamily: "sans-serif", fontWeight: 100 }}
    >
      <div className="col-6 my-3">
        <p>
          The registry is a list of recognised issuers with their certificate
          store addresses. Certificates from these issuers can be recognised and
          verified by our viewer.
        </p>
        <p>
          Certificates with unverified issuer means that the certificate store
          address is not registered. This could mean that the issuer has not
          registered with OpenCerts or the cert
        </p>
      </div>
    </div>
    <div className="row p-3">{renderMembers()}</div>
  </div>
);

export default RegistryPage;
