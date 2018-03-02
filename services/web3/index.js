import React from "react";
import getWeb3 from "./getWeb3";
import getAccounts from "./getAccounts";
import getContract from "./getContract";

// TODO Use a singleton

export default function Web3Wrapper(WrappedComponent, contractDefinition) {
  return class Web3Container extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        web3: null,
        accounts: null,
        contract: null
      };
    }

    async componentDidMount() {
      try {
        const web3 = await getWeb3();
        const accounts = await getAccounts(web3);
        const contract = contractDefinition
          ? await getContract(web3, contractDefinition)
          : null;
        this.setState({ web3, accounts, contract });
      } catch (error) {
        // eslint-disable-next-line no-alert, no-undef
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`
        );
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }

    render() {
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  };
}
