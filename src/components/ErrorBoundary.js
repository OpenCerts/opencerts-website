import React, { Component } from "react";
import PropTypes from "prop-types";
import css from "./error.scss";

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
        <div className={`${css.box}`}>
          <div id="error">
            <div className={`${css.error}`}>
              <br />
              <img
                src="/static/images/errorpage/error.png"
                style={{ height: "15vh" }}
              />
              <h2>Something went wrong!</h2>
              <p>
                There is an error with this certificate, please contact your
                issuing institution.
              </p>
              <a href="/">Go Back</a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node
};
