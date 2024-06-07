import React, { useEffect, useState } from "react";
import Plants from "./Plants";

const UserPlants = ({ loggedIn }) => {
  const [plants, setPlants] = useState();

  useEffect(() => {
    const getUserPlants = async () => {
      try {
        const response = await fetch(
          "https://bloombud-0013ffd7d655.herokuapp.com/plants/userplants",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.ok) {
          const results = await response.json();
          setPlants(results);
        } else {
          console.error("Error fetching user plants", response.statusText);
        }
      } catch (err) {
        console.error({ message: err });
      }
    };

    getUserPlants();
  }, []);

  return plants ? (
    <Plants plants={plants} loggedIn={loggedIn} user={true} />
  ) : (
    <div>Loading...</div>
  );
};

export default UserPlants;
