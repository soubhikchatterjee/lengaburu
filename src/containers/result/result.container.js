import React from "react";
import { useHistory, useLocation } from "react-router";

// Components
import Header from "components/header/header.component";

function Result() {
  const history = useHistory();
  const location = useLocation();

  const handleStartAgain = () => {
    history.push({
      pathname: "/",
      state: "restart",
    });
  };

  return (
    <div className="container">
      <Header />
      {location.state.status === "success" ? (
        <h4 className="mt-4 text-success">
          Success! Congratulations on Finding Felone. King Shah is mighty
          pleased .
        </h4>
      ) : (
        <h4 className="mt-4 text-danger">Failure! Failed to find Felone.</h4>
      )}

      <h3>Time Taken: {location.state.totalTimeTaken}</h3>
      <h3>Planet Found: {location.state.planetFound}</h3>

      <p>
        <button
          onClick={handleStartAgain}
          type="button"
          className="btn btn-success"
        >
          Start Again!
        </button>
      </p>
    </div>
  );
}

export default Result;
