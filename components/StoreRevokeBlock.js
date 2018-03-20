import React, { Component } from "react";
import PropTypes from "prop-types";
import HashColor from "./HashColor";
import HashColorInput from "./HashColorInput";

class StoreRevokeBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      certificateHash: ""
    };

    this.onHashChange = this.onHashChange.bind(this);
    this.onRevokeClick = this.onRevokeClick.bind(this);
  }

  onHashChange(event) {
    this.setState({
      certificateHash: event.target.value
    });
  }

  onRevokeClick() {
    const { adminAddress, storeAddress, handleCertificateRevoke } = this.props;

    const yes = window.confirm("Are you sure you want to revoke this hash?"); // eslint-disable-line

    if (yes) {
      handleCertificateRevoke({
        storeAddress,
        fromAddress: adminAddress,
        certificateHash: this.state.certificateHash
      });
    }
  }

  render() {
    const { revokedTx } = this.props;
    return (
      <div>
        <div>
          Certificate hash to revoke
          <HashColorInput
            type="hash"
            hashee={this.state.certificateHash}
            onChange={this.onHashChange}
            value={this.state.certificateHash}
            placeholder="0x…"
          />
        </div>
        <button className="mt4 danger" onClick={this.onRevokeClick}>
          <i className="fas fa-exclamation-triangle" /> Revoke
        </button>

        {revokedTx ? (
          <div className="mt5">
            <p>Revoked certificates.</p>
            <div>
              Transaction ID
              <HashColor hashee={revokedTx} />
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default StoreRevokeBlock;

StoreRevokeBlock.propTypes = {
  revokedTx: PropTypes.string,
  storeAddress: PropTypes.string,
  adminAddress: PropTypes.string,
  handleCertificateRevoke: PropTypes.func
};
