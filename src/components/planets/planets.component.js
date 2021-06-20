import React from "react";
import PropTypes from "prop-types";

/**
 * @param {array} options
 */
function Dropdown({ options, onSelect }) {
  return (
    <div>
      <input list="data" name="list" onChange={onSelect} />
      <datalist id="data">
        {options?.length > 0 &&
          options.map((option) => (
            <option
              key={option.name}
              data-distance={option.distance}
              value={option.name}
            >
              Distance: {option.distance}
            </option>
          ))}
      </datalist>
    </div>
  );
}

Dropdown.propTypes = {
  options: PropTypes.array,
  onSelect: PropTypes.func.isRequired,
};

export default Dropdown;
