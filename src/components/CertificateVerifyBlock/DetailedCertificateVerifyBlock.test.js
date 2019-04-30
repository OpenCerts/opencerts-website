import React from 'react';
import renderer from 'react-test-renderer';


import CertificateVerifyBlock from './DetailedCertificateVerifyBlock';

it('renders correctly when there are no items', () => {
  const tree = renderer.create(<CertificateVerifyBlock statusSummary={''}
    hashStatus={{verified: true}}
    issuedStatus={{verified: true}}
    notRevokedStatus={{verified: true}}
    issuerIdentityStatus={{verified: true}} />).toJSON();
  expect(tree).toMatchSnapshot();
});