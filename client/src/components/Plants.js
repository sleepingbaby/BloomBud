const Plants = ({ plants, loggedIn, user }) => {
  const deletePlant = async (plant) => {
    const url = `http://localhost:3001/plants/delete/${plant._id}`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        window.location.reload();
        console.log("Deleted Plant");
      }
    } catch (err) {
      console.error({ message: err });
    }
  };

  const addPlant = async (plant) => {
    const newPlant = {
      name: plant.name || plant.scientific_name,
      scientific_name: plant.scientific_name,
      img: plant.image_url,
    };

    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const response = await fetch("http://localhost:3001/plants/add", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(newPlant),
        credentials: "include",
      });

      if (response.ok) {
        alert("Plant Added Successfully");
      }
    } catch (err) {
      console.error({ message: err });
    }
  };

  return (
    <div className="my-3">
      <div className="container">
        <div className="row justify-content-center gap-3">
          {plants.map((plant) => (
            <div
              key={plant.id || plant._id}
              className="card h-100 col-4 p-3"
              style={{ width: "18rem" }}
            >
              <img
                className="card-img-top"
                src={
                  plant.image_url ||
                  plant.img ||
                  "https://thumbs.dreamstime.com/b/cute-cartoon-potted-plant-green-leaves-cute-face-cute-cartoon-potted-plant-green-leaves-cute-face-beautiful-158475948.jpg"
                }
                alt={plant.common_name}
              />
              <div className="card-body">
                <h5 className="card-title">
                  {plant.common_name || plant.scientific_name}
                </h5>
                <p className="card-description">{plant.scientific_name}</p>
                {loggedIn && !user && (
                  <button
                    className="btn btn-secondary"
                    onClick={() => addPlant(plant)}
                  >
                    Add
                  </button>
                )}
                {loggedIn && user && (
                  <button
                    className="btn btn-danger"
                    onClick={() => deletePlant(plant)}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Plants;
