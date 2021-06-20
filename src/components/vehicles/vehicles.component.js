import React from "react";
import PropTypes from "prop-types";

// Styles
import "./vehicles.styles.css";

function Vehicles({
  idx,
  isVehiclesLoading,
  options = [],
  distanceToPlanet,
  onSelect,
}) {
  if (isVehiclesLoading) {
    return "Loading Vehicles...";
  }

  return (
    <div className="vehicles">
      {options?.length > 0 &&
        options.map((option) => (
          <div key={option.name} className="form-check">
            <input
              disabled={option.max_distance < distanceToPlanet}
              className="form-check-input"
              type="radio"
              name={`vehicle_${idx}`}
              id={`vehicle_${option.name}_${idx}`}
              value={option.name}
              onChange={() => onSelect(option)}
            />
            <label
              className="form-check-label"
              htmlFor={`vehicle_${option.name}_${idx}`}
            >
              &nbsp;{option.name} ({option.total_no})
            </label>
          </div>
        ))}
    </div>
  );
}

Vehicles.propTypes = {
  idx: PropTypes.number.isRequired,
  isVehiclesLoading: PropTypes.bool.isRequired,
  options: PropTypes.array,
  distanceToPlanet: PropTypes.number,
  onSelect: PropTypes.func.isRequired,
};

export default Vehicles;
