import React, { Component } from "react";
import PropTypes from "prop-types";

class StoreRevokeBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      certificateHash: "",
      reason: "1"
    };

    this.onHashChange = this.onHashChange.bind(this);
    this.onRevokeClick = this.onRevokeClick.bind(this);
    this.onReasonChange = this.onReasonChange.bind(this);
  }

  onHashChange(event) {
    this.setState({
      certificateHash: event.target.value
    });
  }

  onReasonChange(event) {
    this.setState({
      reason: event.target.value
    });
  }

  onRevokeClick() {
    const { adminAddress, storeAddress, handleCertificateRevoke } = this.props;
    handleCertificateRevoke({
      storeAddress,
      fromAddress: adminAddress,
      reason: Number(this.state.reason),
      certificateHash: this.state.certificateHash
    });
  }

  render() {
    const { revokedTx } = this.props;
    return (
      <div>
        <h2>Revoke Certificate</h2>
        <div>
          Certificate Hash: <br />
          <input
            type="text"
            onChange={this.onHashChange}
            value={this.state.certificateHash}
          />
        </div>
        <div>
          Reason: <br />
          <select value={this.state.reason} onChange={this.onReasonChange}>
            <option value="1">Issued in error</option>
            <option value="2">Change in content</option>
            <option value="3">Malpractice</option>
            <option value="0">Others</option>
          </select>
        </div>
        {revokedTx ? <div>Revoked: {revokedTx}</div> : null}
        <button onClick={this.onRevokeClick}>Revoke!</button>
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
