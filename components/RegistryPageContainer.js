const members = [
  {
    name: "Issuer A",
    address: "0x9999999999999999999999999999999",
    website: "https://tech.gov.sg",
    email: "issuer@opencerts.io",
    phone: "+65 6666 6666"
  },
  {
    name: "Issuer B",
    address: "0x9999999999999999999999999999999",
    website: "https://tech.gov.sg",
    email: "issuer@opencerts.io",
    phone: "+65 6666 6666"
  },
  {
    name: "Issuer C",
    address: "0x9999999999999999999999999999999",
    website: "https://tech.gov.sg",
    email: "issuer@opencerts.io",
    phone: "+65 6666 6666"
  },
  {
    name: "Issuer D",
    address: "0x9999999999999999999999999999999",
    website: "https://tech.gov.sg",
    email: "issuer@opencerts.io",
    phone: "+65 6666 6666"
  }
];

const renderMembers = () =>
  members.map((m, i) => (
    <div key={i} className="col-6 mb-3">
      <h4>{m.name}</h4>
      {m.address ? <div>Certificate Store: {m.address}</div> : ""}
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
      {m.email ? <div>Email: {m.email}</div> : ""}
      {m.phone ? <div>Phone: {m.phone}</div> : ""}
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
