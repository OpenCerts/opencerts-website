import React from "react";
import PropTypes from "prop-types";
import css from "./obfuscatableValueStyles.scss";

const ObfuscatableValue = ({ field, value, handleObfuscation, editable }) =>
  value ? (
    <div
      onClick={() => handleObfuscation(field)}
      style={{ display: "inline-block" }}
    >
      {value}{" "}
      {editable && <i className={`fas fa-times ${css["remove-icon"]}`} />}
    </div>
  ) : null;

ObfuscatableValue.propTypes = {
  field: PropTypes.string,
  value: PropTypes.string,
  handleObfuscation: PropTypes.func,
  editable: PropTypes.bool
};

export default ObfuscatableValue;
