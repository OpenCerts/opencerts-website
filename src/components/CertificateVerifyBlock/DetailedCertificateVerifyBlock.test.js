import React from "react";
import renderer from "react-test-renderer";
import { LOG_LEVEL } from "./constants";

import CertificateVerifyBlock from "./DetailedCertificateVerifyBlock";

it("renders correctly when the certificate verfied", () => {
  const tree = renderer
    .create(
      <CertificateVerifyBlock
        statusSummary={LOG_LEVEL.VALID}
        hashStatus={{ verified: true }}
        issuedStatus={{ verified: true }}
        notRevokedStatus={{ verified: true }}
        issuerIdentityStatus={{ verified: true }}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly when the certificate`s hash status not verified", () => {
  const tree = renderer
    .create(
      <CertificateVerifyBlock
        statusSummary={LOG_LEVEL.INVALID}
        hashStatus={{ verified: false }}
        issuedStatus={{ verified: true }}
        notRevokedStatus={{ verified: true }}
        issuerIdentityStatus={{ verified: true }}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly when the certificate`s issue status not verified", () => {
  const tree = renderer
    .create(
      <CertificateVerifyBlock
        statusSummary={LOG_LEVEL.INVALID}
        hashStatus={{ verified: true }}
        issuedStatus={{ verified: false }}
        notRevokedStatus={{ verified: true }}
        issuerIdentityStatus={{ verified: true }}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly when the certificate has been revoked", () => {
  const tree = renderer
    .create(
      <CertificateVerifyBlock
        statusSummary={LOG_LEVEL.INVALID}
        hashStatus={{ verified: true }}
        issuedStatus={{ verified: true }}
        notRevokedStatus={{ verified: false }}
        issuerIdentityStatus={{ verified: true }}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly when the certificate`s issuer not identified", () => {
  const tree = renderer
    .create(
      <CertificateVerifyBlock
        statusSummary={LOG_LEVEL.WARNING}
        hashStatus={{ verified: true }}
        issuedStatus={{ verified: true }}
        notRevokedStatus={{ verified: true }}
        issuerIdentityStatus={{ verified: false }}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly when the certificate is invalid and hash, isseud, notRevoked, issuerIdentity status are not verified", () => {
  const tree = renderer
    .create(
      <CertificateVerifyBlock
        statusSummary={LOG_LEVEL.INVALID}
        hashStatus={{ verified: false }}
        issuedStatus={{ verified: false }}
        notRevokedStatus={{ verified: false }}
        issuerIdentityStatus={{ verified: false }}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
