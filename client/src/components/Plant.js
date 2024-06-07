import React from "react";

const Plant = ({ plant }) => {
  return (
    <div className="card flex-row" style={{ width: "100%" }}>
      <img src={plant.image_url} alt={plant.common_name} />
      <div className="card-body">
        <h5 className="card-title">{plant.common_name}</h5>
      </div>
    </div>
  );
};

export default Plant;
