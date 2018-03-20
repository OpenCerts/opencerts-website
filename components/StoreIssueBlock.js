import React, { Component } from "react";
import PropTypes from "prop-types";
import HashColor from "./HashColor";
import HashColorInput from "./HashColorInput";

class StoreIssueBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      certificateHash: ""
    };

    this.onHashChange = this.onHashChange.bind(this);
    this.onIssueClick = this.onIssueClick.bind(this);
  }

  onHashChange(event) {
    this.setState({
      certificateHash: event.target.value
    });
  }

  onIssueClick() {
    const { adminAddress, storeAddress, handleCertificateIssue } = this.props;
    handleCertificateIssue({
      storeAddress,
      fromAddress: adminAddress,
      certificateHash: this.state.certificateHash
    });
  }

  render() {
    return (
      <div>
        <div>
          Issue certificates with the Merkle root hash
          <HashColorInput
            type="hash"
            hashee={this.state.certificateHash}
            onChange={this.onHashChange}
            value={this.state.certificateHash}
            placeholder="0x…"
          />
        </div>
        <button className="mt4" onClick={this.onIssueClick}>
          Issue
        </button>

        {this.props.issuedTx ? (
          <div className="mt5">
            <p>Batch has been issued.</p>
            <div>
              Transaction ID <HashColor hashee={this.props.issuedTx} />
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default StoreIssueBlock;

StoreIssueBlock.propTypes = {
  issuedTx: PropTypes.string,
  storeAddress: PropTypes.string,
  adminAddress: PropTypes.string,
  handleCertificateIssue: PropTypes.func
};
