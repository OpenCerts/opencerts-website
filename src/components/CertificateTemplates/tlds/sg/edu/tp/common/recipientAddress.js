import PropTypes from "prop-types";

const RecipientAddress = ({ certificate }) => (
  <span>
    {certificate.additionalData.addressBlockHouseNumber && (
      <span>
        {certificate.additionalData.addressBlockHouseNumber}
        &nbsp;
      </span>
    )}

    {certificate.additionalData.addressStreetName1 && (
      <span>
        {certificate.additionalData.addressStreetName1}
        <br />
      </span>
    )}

    {certificate.additionalData.addressStreetName2 && (
      <span>
        {certificate.additionalData.addressStreetName2}
        <br />
      </span>
    )}

    {certificate.additionalData.addressStreetName3 && (
      <span>
        {certificate.additionalData.addressStreetName3}
        <br />
      </span>
    )}

    {certificate.additionalData.addressFloorNumber && (
      <span>
        {certificate.additionalData.addressFloorNumber}
        &nbsp;
      </span>
    )}

    {certificate.additionalData.addressUnitNumber && (
      <span>
        {certificate.additionalData.addressUnitNumber}
        <br />
      </span>
    )}

    {certificate.additionalData.addressCountry && (
      <span>
        {certificate.additionalData.addressCountry}
        &nbsp;
      </span>
    )}

    {certificate.additionalData.addressPostalCode && (
      <span>{certificate.additionalData.addressPostalCode}</span>
    )}
  </span>
);

RecipientAddress.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default RecipientAddress;
