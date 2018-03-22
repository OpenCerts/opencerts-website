import React, { Component } from "react";
import PropTypes from "prop-types";

class ValidatedInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ""
    };
  }

  render() {
    const { placeholder, validatorFn } = this.props;
    const correct = validatorFn(this.state.value);

    return (
      <div
        className="w-100 flex flex-direction-row bn items-center"
        style={{ color: correct ? "green" : "red" }}
      >
        <div
          style={{ width: "16px", textAlign: "center", cursor: "default" }}
          title={correct ? "Identity matched" : "Identity mismatch"}
        >
          {correct ? "✓" : "!"}
        </div>
        <input
          className="ml2 w-100"
          style={{ color: correct ? "green" : "red" }}
          onChange={e => {
            this.setState({ value: e.target.value });
          }}
          placeholder={placeholder}
        />
      </div>
    );
  }
}

ValidatedInput.propTypes = {
  placeholder: PropTypes.string,
  validatorFn: PropTypes.func
};

export default ValidatedInput;
