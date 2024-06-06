import React from "react";

const Plants = ({ plants, name }) => {
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
                src={
                  plant.image_url ||
                  "https://thumbs.dreamstime.com/b/cute-cartoon-potted-plant-green-leaves-cute-face-cute-cartoon-potted-plant-green-leaves-cute-face-beautiful-158475948.jpg"
                }
                alt={plant.common_name}
              />
              <div className="card-body">
                <h5 className="card-title">
                  {plant.common_name ||
                    name[0].toUpperCase() + name.slice(1, name.length)}
                </h5>
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
