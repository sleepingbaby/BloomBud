import React from "react";

const Plants = ({ plants }) => {
  return (
    <div className="my-3">
      <div className="container">
        <div className="row justify-content-center gap-3">
          {plants.map((plant) => (
            <div
              key={plant.id}
              className="card h-100 col-4 p-3"
              style={{ width: "18rem" }}
            >
              <img
                className="card-img-top"
                src={plant.image_url}
                alt={plant.common_name}
              />
              <div className="card-body">
                <h5 className="card-title">{plant.common_name}</h5>
                <p className="card-description">{plant.scientific_name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Plants;
