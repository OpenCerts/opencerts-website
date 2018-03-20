import PropTypes from "prop-types";
import Web3 from "web3";
import HashColor from "./HashColor";

const VALIDATIONS = {
  address: { size: 42, maxLength: 50, validityFn: Web3.utils.isAddress },
  hash: {
    size: 66,
    maxLength: 80,
    validityFn: address => /^(0x){1}[0-9a-fA-F]{64}$/i.test(address)
  },
  none: { size: 70, maxLength: 99999, validityFn: () => true }
};

const HashColorInput = props => {
  const { size, maxLength, validityFn } = VALIDATIONS[props.type]; // eslint-disable-line
  const isValid = validityFn(props.hashee);

  return (
    <HashColor hashee={props.hashee} copy={false} color={isValid}>
      <input
        type="text"
        onChange={props.onChange}
        size={size}
        value={props.value}
        spellCheck="false"
        style={{
          color: "inherit",
          fontFamily: "var(--font-monospace) monospace",
          fontSize: "var(--font-monospace-size)",
          border: isValid ? "solid 1px black" : "solid 1px #e7040f"
        }}
        maxLength={maxLength}
        placeholder={props.placeholder}
      />
    </HashColor>
  );
};

HashColorInput.propTypes = {
  type: PropTypes.string,
  hashee: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  placeholder: PropTypes.string
};

HashColorInput.defaultProps = {
  type: "none"
};

export default HashColorInput;
