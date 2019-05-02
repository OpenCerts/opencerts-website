import React from 'react';
import renderer from 'react-test-renderer';
import { LOG_LEVEL } from "./constants"; 

import CertificateVerifyBlock from './DetailedCertificateVerifyBlock';

it('renders correctly when the certificate verfied', () => {
  const tree = renderer.create(<CertificateVerifyBlock statusSummary={LOG_LEVEL.VALID}
    hashStatus={{verified: true}}
    issuedStatus={{verified: true}}
    notRevokedStatus={{verified: true}}
    issuerIdentityStatus={{verified: true}} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly when the certificate is not verfied', () => {
  const tree = renderer.create(<CertificateVerifyBlock statusSummary={LOG_LEVEL.INVALID}
    hashStatus={{verified: false}}
    issuedStatus={{verified: true}}
    notRevokedStatus={{verified: true}}
    issuerIdentityStatus={{verified: true}} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly when the certificate is not verfied', () => {
  const tree = renderer.create(<CertificateVerifyBlock statusSummary={LOG_LEVEL.INVALID}
    hashStatus={{verified: true}}
    issuedStatus={{verified: false}}
    notRevokedStatus={{verified: true}}
    issuerIdentityStatus={{verified: true}} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly when the certificate is not verfied', () => {
  const tree = renderer.create(<CertificateVerifyBlock statusSummary={LOG_LEVEL.INVALID}
    hashStatus={{verified: true}}
    issuedStatus={{verified: true}}
    notRevokedStatus={{verified: false}}
    issuerIdentityStatus={{verified: true}} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly when the certificate is not verfied', () => {
  const tree = renderer.create(<CertificateVerifyBlock statusSummary={LOG_LEVEL.WARNING}
    hashStatus={{verified: true}}
    issuedStatus={{verified: true}}
    notRevokedStatus={{verified: true}}
    issuerIdentityStatus={{verified: false}} />).toJSON();
  expect(tree).toMatchSnapshot();
});


it('renders correctly when the certificate is not verfied', () => {
  const tree = renderer.create(<CertificateVerifyBlock statusSummary={LOG_LEVEL.INVALID}
    hashStatus={{verified: false}}
    issuedStatus={{verified: false}}
    notRevokedStatus={{verified: false}}
    issuerIdentityStatus={{verified: false}} />).toJSON();
  expect(tree).toMatchSnapshot();
});