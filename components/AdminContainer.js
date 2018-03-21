import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import web3 from "web3";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import {
  loadAdminAddress,
  getAdminAddress,
  deployStore,
  getStoreAddress,
  updateStoreAddress,
  issueCertificate,
  getIssuedTx,
  getRevokedTx,
  revokeCertificate
} from "../reducers/admin";
import { updateNetworkId, getNetworkId } from "../reducers/application";
import StoreDeployBlock from "./StoreDeployBlock";
import StoreIssueBlock from "./StoreIssueBlock";
import StoreRevokeBlock from "./StoreRevokeBlock";
import HashColor from "./HashColor";
import HashColorInput from "./HashColorInput";

const tabStyle = (
  <style jsx>
    {`
      .tab {
        cursor: pointer;
      }

      .tab:hover {
        background-color: gold;
      }

      .tab[aria-selected="true"] {
        color: white;
        background-color: black;
      }
    `}
  </style>
);

class AdminContainer extends Component {
  constructor(props) {
    super(props);
    this.refreshCurrentAddress = this.refreshCurrentAddress.bind(this);
    this.handleStoreDeploy = this.handleStoreDeploy.bind(this);
    this.storeAddressOnChange = this.storeAddressOnChange.bind(this);
    this.handleCertificateIssue = this.handleCertificateIssue.bind(this);
    this.handleCertificateRevoke = this.handleCertificateRevoke.bind(this);

    this.state = {
      localStoreAddress: ""
    };
  }

  componentWillMount() {
    this.props.updateNetworkId();
    this.props.loadAdminAddress();
  }

  storeAddressOnChange(event) {
    const address = event.target.value;
    this.setState({ localStoreAddress: address });
    if (web3.utils.isAddress(address)) {
      this.props.updateStoreAddress(address);
    }
  }

  handleStoreDeploy(payload) {
    this.props.deployStore(payload);
  }

  handleCertificateIssue(payload) {
    this.props.issueCertificate(payload);
  }

  handleCertificateRevoke(payload) {
    this.props.revokeCertificate(payload);
  }

  refreshCurrentAddress() {
    this.props.loadAdminAddress();
  }

  render() {
    const {
      adminAddress,
      storeAddress,
      issuedTx,
      revokedTx,
      networkId
    } = this.props;

    return (
      <div>
        <h1>Admin</h1>
        <div className="flex bb pb3">
          <div className="w-50">
            <h3>
              Current account{" "}
              <div
                style={{ cursor: "pointer" }}
                className="dib click-to-refresh"
                onClick={this.refreshCurrentAddress}
                title="Try to grab current account"
                tabIndex={1}
              >
                <i className="fas fa-sync-alt" />
                <style jsx>{`
                  .click-to-refresh {
                    transform: rotateZ(0deg);
                    transition: transform 1.5s ease-in;
                  }

                  .click-to-refresh:hover {
                    color: #e7040f;
                  }

                  .click-to-refresh:active {
                    transform: rotateZ(-360deg);
                    transition: transform 0s;
                  }

                  .click-to-refresh:focus {
                    outline: none;
                  }
                `}</style>
              </div>
            </h3>

            <div className="pa2">
              <HashColor hashee={adminAddress} networkId={networkId} />
            </div>
          </div>

          <div className="w-50">
            <h3>Store address</h3>
            <HashColorInput
              type="address"
              value={this.state.localStoreAddress}
              onChange={this.storeAddressOnChange}
              placeholder="Enter existing (0x…), or deploy new instance"
            />
          </div>
        </div>

        <Tabs className="flex flex-row w-100">
          <TabList className="flex flex-column w-30 list pa0">
            <Tab className="tab pl3">
              <h3>Deploy new instance</h3>
              {tabStyle}
            </Tab>
            <Tab className="tab pl3">
              <h3>Issue certificate batch</h3>
            </Tab>
            <Tab className="tab pl3">
              <h3>Revoke certificate</h3>
            </Tab>
          </TabList>

          <div className="w-70 pa4 pl5">
            <TabPanel>
              <StoreDeployBlock
                adminAddress={adminAddress}
                handleStoreDeploy={this.handleStoreDeploy}
              />
            </TabPanel>

            <TabPanel>
              {storeAddress ? (
                <StoreIssueBlock
                  networkId={networkId}
                  issuedTx={issuedTx}
                  adminAddress={adminAddress}
                  storeAddress={storeAddress}
                  handleCertificateIssue={this.handleCertificateIssue}
                />
              ) : (
                <div className="red">Enter a store address first.</div>
              )}
            </TabPanel>

            <TabPanel>
              {storeAddress ? (
                <StoreRevokeBlock
                  networkId={networkId}
                  revokedTx={revokedTx}
                  adminAddress={adminAddress}
                  storeAddress={storeAddress}
                  handleCertificateRevoke={this.handleCertificateRevoke}
                />
              ) : (
                <div className="red">Enter a store address first.</div>
              )}
            </TabPanel>
          </div>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  adminAddress: getAdminAddress(store),
  storeAddress: getStoreAddress(store),
  issuedTx: getIssuedTx(store),
  revokedTx: getRevokedTx(store),
  networkId: getNetworkId(store)
});

const mapDispatchToProps = dispatch => ({
  loadAdminAddress: payload => dispatch(loadAdminAddress(payload)),
  updateNetworkId: () => dispatch(updateNetworkId()),
  deployStore: payload => dispatch(deployStore(payload)),
  issueCertificate: payload => dispatch(issueCertificate(payload)),
  revokeCertificate: payload => dispatch(revokeCertificate(payload)),
  updateStoreAddress: payload => dispatch(updateStoreAddress(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer);

AdminContainer.propTypes = {
  updateNetworkId: PropTypes.func,
  loadAdminAddress: PropTypes.func,
  deployStore: PropTypes.func,
  issueCertificate: PropTypes.func,
  updateStoreAddress: PropTypes.func,
  adminAddress: PropTypes.string,
  storeAddress: PropTypes.string,
  issuedTx: PropTypes.string,
  revokedTx: PropTypes.string,
  revokeCertificate: PropTypes.func,
  networkId: PropTypes.number
};
