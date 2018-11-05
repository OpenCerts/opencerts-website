import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { types as networkTypes } from "../../services/web3/getWeb3";
import {
  updateWeb3,
  getNetwork,
  getCustomRpc
} from "../../reducers/application";
import css from "./networkSelector.scss";

class NetworkSelector extends Component {
  constructor(props) {
    super(props);

    this.handleNetworkChange = this.handleNetworkChange.bind(this);
  }

  handleNetworkChange(e) {
    this.props.updateWeb3({
      network: e.target.value
    });
  }

  render() {
    const { INFURA_MAINNET, INFURA_ROPSTEN } = networkTypes;

    return (
      <select
        value={this.props.network}
        onChange={this.handleNetworkChange}
        className={css.selector}
      >
        <option value={INFURA_MAINNET}>Mainnet</option>
        <option value={INFURA_ROPSTEN}>Testnet (Ropsten)</option>
      </select>
    );
  }
}

const mapStateToProps = store => ({
  network: getNetwork(store),
  customRpc: getCustomRpc(store)
});

const mapDispatchToProps = dispatch => ({
  updateWeb3: payload => dispatch(updateWeb3(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NetworkSelector);

NetworkSelector.propTypes = {
  network: PropTypes.string,
  customRpc: PropTypes.string,
  updateWeb3: PropTypes.func
};
