import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchData, getPeople } from "../reducers/content";
import { loadEthAddresses, loadEthContract } from "../reducers/ethereum";
import PeopleTable from "./PeopleTable";
import SimpleStorage from "../services/contracts/SimpleStorage.json";

class PeopleTableContainer extends Component {
  componentWillMount() {
    this.props.fetchData();
    this.props.loadEthAddresses();
    this.props.loadEthContract({
      contractDefinition: SimpleStorage,
      contractName: "SimpleStorage"
    });
  }

  render() {
    return (
      <div>
        <PeopleTable
          people={this.props.people}
          fetchData={this.props.fetchData}
        />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  people: getPeople(store)
});

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(fetchData()),
  loadEthAddresses: () => dispatch(loadEthAddresses()),
  loadEthContract: payload => dispatch(loadEthContract(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  PeopleTableContainer
);

PeopleTableContainer.propTypes = {
  people: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      age: PropTypes.number
    })
  ),
  fetchData: PropTypes.func,
  loadEthAddresses: PropTypes.func,
  loadEthContract: PropTypes.func
};
