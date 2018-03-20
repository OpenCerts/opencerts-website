import React, { Component } from "react";
import PropTypes from "prop-types";

class StoreDeployBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issuerName: "",
      issuerUrl: ""
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onUrlChange = this.onUrlChange.bind(this);
    this.onDeployClick = this.onDeployClick.bind(this);
  }

  onNameChange(event) {
    this.setState({
      issuerName: event.target.value
    });
  }

  onUrlChange(event) {
    this.setState({
      issuerUrl: event.target.value
    });
  }

  onDeployClick() {
    const { adminAddress, handleStoreDeploy } = this.props;
    handleStoreDeploy({
      fromAddress: adminAddress,
      name: this.state.issuerName,
      url: this.state.issuerUrl
    });
  }

  refreshCurrentAddress() {
    this.props.loadAdminAddress();
  }

  render() {
    return (
      <div className="w-100">
        <div className="mb4">
          <div>
            Issuer Name<br />
            <input
              type="text"
              onChange={this.onNameChange}
              value={this.state.issuerName}
              size={50}
              required
            />
          </div>
          <div className="mt2">
            Issuer URL<br />
            <input
              type="text"
              onChange={this.onUrlChange}
              value={this.state.issuerUrl}
              size={50}
              required
            />
          </div>
        </div>
        <button onClick={this.onDeployClick}>Deploy</button>
      </div>
    );
  }
}

export default StoreDeployBlock;

StoreDeployBlock.propTypes = {
  adminAddress: PropTypes.string,
  loadAdminAddress: PropTypes.func,
  handleStoreDeploy: PropTypes.func
};
