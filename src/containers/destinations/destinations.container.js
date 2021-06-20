import React, { useEffect } from "react";
import PropTypes from "prop-types";

// Custom Components
import Planets from "components/planets/planets.component";
import Vehicles from "components/vehicles/vehicles.component";

// Hooks
import useHttp from "hooks/useHttp";

// Styles
import "./destinations.styles.css";

function Destinations({
  setReadyToFind,
  timeTaken,
  setTimeTaken,
  totalTimeTaken,
  selectedPlanets,
  setSelectedPlanets,
  selectedVehicles,
  setSelectedVehicles,
}) {
  const {
    get: getPlanets,
    isLoading: isPlanetsLoading,
    response: planetsResponse,
  } = useHttp("/planets");

  const {
    get: getVehicles,
    isLoading: isVehiclesLoading,
    response: vehiclesResponse,
  } = useHttp("/vehicles");

  // Get all the planet & vehicles list from api
  useEffect(() => {
    getPlanets();
    getVehicles();
  }, [getPlanets, getVehicles]);

  useEffect(() => {
    if (Object.keys(timeTaken).length === 4) {
      setReadyToFind(true);
    } else {
      setReadyToFind(false);
    }
  }, [timeTaken, setReadyToFind]);

  const handlePlanetSelection = (e, idx) => {
    const selectedPlanet = e.target.value;
    if (!selectedPlanet) return;

    const selectedPlanetObject = planetsResponse.find(
      (planet) => planet.name === selectedPlanet
    );

    setSelectedPlanets({
      ...selectedPlanets,
      [idx]: selectedPlanetObject,
    });
  };

  const handleVehicleSelection = (vehicle, idx) => {
    setSelectedVehicles({
      ...selectedVehicles,
      [idx]: vehicle,
    });

    setTimeTaken({
      ...timeTaken,
      [idx]: selectedPlanets[idx].distance / vehicle.speed,
    });
  };

  if (isPlanetsLoading) {
    return "Loading Planets...";
  }

  return (
    <div className="flex-column mt-30">
      {[1, 2, 3, 4].map((idx) => (
        <div key={idx} className="flex-column-item">
          <p>Destination {idx}:</p>
          <Planets
            options={planetsResponse}
            onSelect={(e) => handlePlanetSelection(e, idx)}
          />
          {selectedPlanets[idx]?.distance > 0 && (
            <Vehicles
              idx={idx}
              distanceToPlanet={selectedPlanets[idx]?.distance}
              options={vehiclesResponse}
              isVehiclesLoading={isVehiclesLoading}
              onSelect={(e) => handleVehicleSelection(e, idx)}
            />
          )}
        </div>
      ))}

      <div className="flex-column-item">
        <strong>Time Taken: </strong>
        {totalTimeTaken}
      </div>
    </div>
  );
}

Destinations.propTypes = {
  setReadyToFind: PropTypes.func,
  timeTaken: PropTypes.object,
  setTimeTaken: PropTypes.func,
  totalTimeTaken: PropTypes.number,
  selectedPlanets: PropTypes.object,
  setSelectedPlanets: PropTypes.func,
  selectedVehicles: PropTypes.object,
  setSelectedVehicles: PropTypes.func,
};

export default Destinations;
