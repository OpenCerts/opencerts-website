import React, { Component } from "react";
import PropTypes from "prop-types";

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

  refreshCurrentAddress() {
    this.props.loadAdminAddress();
  }

  render() {
    return (
      <div>
        <h2>Issue Certificate</h2>
        <div>
          Certificate Hash: <br />
          <input
            type="text"
            onChange={this.onHashChange}
            value={this.state.certificateHash}
          />
        </div>
        {this.props.issuedTx ? <div>Issued: {this.props.issuedTx}</div> : null}
        <button onClick={this.onIssueClick}>Issue!</button>
      </div>
    );
  }
}

export default StoreIssueBlock;

StoreIssueBlock.propTypes = {
  issuedTx: PropTypes.string,
  storeAddress: PropTypes.string,
  adminAddress: PropTypes.string,
  loadAdminAddress: PropTypes.func,
  handleCertificateIssue: PropTypes.func
};
