import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  loadAdminAddress,
  getAdminAddress,
  deployStore,
  getStoreAddress,
  updateStoreAddress,
  issueCertificate,
  getIssuedTx
} from "../reducers/admin";
import StoreDeployBlock from "./StoreDeployBlock";
import StoreIssueBlock from "./StoreIssueBlock";

class AdminContainer extends Component {
  constructor(props) {
    super(props);
    this.refreshCurrentAddress = this.refreshCurrentAddress.bind(this);
    this.handleStoreDeploy = this.handleStoreDeploy.bind(this);
    this.storeAddressOnChange = this.storeAddressOnChange.bind(this);
    this.storeAddressUpdate = this.storeAddressUpdate.bind(this);
    this.handleCertificateIssue = this.handleCertificateIssue.bind(this);

    this.state = {
      updatedStoreAddress: ""
    };
  }

  componentWillMount() {
    this.props.loadAdminAddress();
  }

  storeAddressOnChange(event) {
    this.setState({ updatedStoreAddress: event.target.value });
  }

  storeAddressUpdate() {
    this.props.updateStoreAddress(this.state.updatedStoreAddress);
  }

  handleStoreDeploy(payload) {
    this.props.deployStore(payload);
  }

  handleCertificateIssue(payload) {
    this.props.issueCertificate(payload);
  }

  refreshCurrentAddress() {
    this.props.loadAdminAddress();
  }

  render() {
    const { adminAddress, storeAddress, issuedTx } = this.props;
    return (
      <div>
        <h1>Certificate Store Administrator</h1>
        <h2>Settings</h2>
        <div>
          <div className="dib" onClick={this.refreshCurrentAddress}>
            <i className="fas fa-sync-alt" />
          </div>
          Admin Address:
          {adminAddress}
        </div>
        <div>
          Store Address:
          {storeAddress}
        </div>
        <div>
          Set Store Address Manually:
          <input
            value={this.updatedStoreAddress}
            className="w-100"
            onChange={this.storeAddressOnChange}
          />
          <button onClick={this.storeAddressUpdate}>
            Change Store Address
          </button>
        </div>
        <StoreDeployBlock
          adminAddress={adminAddress}
          handleStoreDeploy={this.handleStoreDeploy}
        />
        <StoreIssueBlock
          issuedTx={issuedTx}
          adminAddress={adminAddress}
          storeAddress={storeAddress}
          handleCertificateIssue={this.handleCertificateIssue}
        />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  adminAddress: getAdminAddress(store),
  storeAddress: getStoreAddress(store),
  issuedTx: getIssuedTx(store)
});

const mapDispatchToProps = dispatch => ({
  loadAdminAddress: payload => dispatch(loadAdminAddress(payload)),
  deployStore: payload => dispatch(deployStore(payload)),
  issueCertificate: payload => dispatch(issueCertificate(payload)),
  updateStoreAddress: payload => dispatch(updateStoreAddress(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer);

AdminContainer.propTypes = {
  loadAdminAddress: PropTypes.func,
  deployStore: PropTypes.func,
  issueCertificate: PropTypes.func,
  updateStoreAddress: PropTypes.func,
  adminAddress: PropTypes.string,
  storeAddress: PropTypes.string,
  issuedTx: PropTypes.string
};
