import React, { useState } from "react";
import Plants from "./Plants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Search = () => {
  const [searchedPlant, setSearchedPlant] = useState("");
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPlants = async (plant) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/plants/search/${plant}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const results = await response.json();
        setPlants(results.data);
      } else {
        console.error("Error fetching plants:", response.statusText);
      }
    } catch (err) {
      console.error({ message: err });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="container d-flex flex-column justify-content-center align-items-center">
        <div className="input-group">
          <input
            type="text"
            className="searchbar form-control"
            placeholder="Search for a plant"
            value={searchedPlant}
            onChange={(e) => setSearchedPlant(e.target.value)}
          ></input>
          <button
            className="btn btn-secondary"
            onClick={() => getPlants(searchedPlant)}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : plants.length > 0 ? (
          <Plants plants={plants} name={searchedPlant} />
        ) : (
          <div> Nothing to see here</div>
        )}
      </div>
    </div>
  );
};

export default Search;
