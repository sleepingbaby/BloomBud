import React, { useEffect, useState } from "react";
import Plants from "./Plants";

const Main = () => {
  const [plants, setPlants] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPlants = async () => {
      try {
        const response = await fetch("http://localhost:3001/plants", {
          method: "GET",
        });

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

    getPlants();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Plants plants={plants} />
    </div>
  );
};

export default Main;
