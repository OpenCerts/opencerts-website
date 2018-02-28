import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchData, getPeople } from "../reducers/content";
import PeopleTable from "./PeopleTable";

class PeopleTableContainer extends Component {
  componentWillMount() {
    this.props.fetchData();
  }

  render() {
    return (
      <PeopleTable
        people={this.props.people}
        fetchData={this.props.fetchData}
      />
    );
  }
}

const mapStateToProps = store => ({
  people: getPeople(store)
});

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(fetchData())
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
  fetchData: PropTypes.func
};
