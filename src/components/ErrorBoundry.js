import React, { Component } from "react";
import PropTypes from "prop-types";

const style = {
  borderRadius: 10,
  padding: 10,
  width: "70%",
  background: "#f8f9fa",
  border: "1px solid #dc3545",
  margin: "50px auto",
  textAlign: "center",
  verticalAlign: "middle",
  lineHeight: 0.1
};
const iconStyle = {
  color: "red",
  fontSize: 50
};

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch() {
    this.setState({
      hasError: true
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={style}>
          <i className="fas fa-exclamation-triangle" style={iconStyle} />
          <h2>
            Something has gone wrong with this certificate, please contact your
            issuing institution.
          </h2>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.Component
};
