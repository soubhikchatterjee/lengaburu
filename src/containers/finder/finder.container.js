import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

// Containers
import Destinations from "containers/destinations/destinations.container";

// Components
import Header from "components/header/header.component";

// Hooks
import useHttp from "hooks/useHttp";

function Finder() {
  const history = useHistory();
  const [timeTaken, setTimeTaken] = useState({});
  const [totalTimeTaken, setTotalTimeTaken] = useState(0);
  const [readyToFind, setReadyToFind] = useState(false);
  const [selectedPlanets, setSelectedPlanets] = useState({});
  const [selectedVehicles, setSelectedVehicles] = useState({});

  const { post: getToken, response: tokenResponse } = useHttp("/token");
  const { post: findFalcone, response: falconeResponse } = useHttp("/find");

  // Get token on app load
  useEffect(() => {
    getToken({
      headers: {
        Accept: "application/json",
      },
    });
    // eslint-disable-next-line
  }, []);

  // When the felone response is received
  useEffect(() => {
    if (falconeResponse) {
      history.push({
        pathname: "/result",
        state: {
          status: falconeResponse.status,
          totalTimeTaken,
          planetFound: falconeResponse.planet_name || "--",
        },
      });
    }
    // eslint-disable-next-line
  }, [falconeResponse, history]);

  // Accumulate total time taken for all 4 vehicles
  useEffect(() => {
    if (timeTaken) {
      const time = Object.values(timeTaken).reduce(
        (accumulator, current) => accumulator + current,
        0
      );
      setTotalTimeTaken(time);
    }
  }, [timeTaken]);

  const handleFindFalcone = () => {
    findFalcone({
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      postData: {
        token: tokenResponse.token,
        planet_names: Object.values(selectedPlanets).map(
          (planet) => planet.name
        ),
        vehicle_names: Object.values(selectedVehicles).map(
          (vehicle) => vehicle.name
        ),
      },
    });
  };

  return (
    <div className="container">
      <Header />
      <h3 className="mb-5">Select planets you want to search in:</h3>

      <Destinations
        setReadyToFind={setReadyToFind}
        timeTaken={timeTaken}
        setTimeTaken={setTimeTaken}
        totalTimeTaken={totalTimeTaken}
        selectedPlanets={selectedPlanets}
        setSelectedPlanets={setSelectedPlanets}
        selectedVehicles={selectedVehicles}
        setSelectedVehicles={setSelectedVehicles}
      />

      <button
        disabled={!readyToFind}
        type="button"
        className="btn btn-primary mt-5"
        onClick={handleFindFalcone}
      >
        Find Fancone!
      </button>
    </div>
  );
}

export default Finder;
