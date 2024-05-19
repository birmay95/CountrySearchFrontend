import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const apiUrl = "https://countrysearch.onrender.com";

export default function EditCountry() {
  const navigate = useNavigate();
  const { cityId, countryId } = useParams();

  const [city, setCity] = useState({
    name: "",
    population: "",
    areaSquareKm: ""
  });

  const { name, population, areaSquareKm } = city;

  const onInputChange = (e) => {
    setCity({ ...city, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const url = `${apiUrl}/api/cities/${cityId}?name=${city.name}&population=${city.population}&areaSquareKm=${city.areaSquareKm}`;
  
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      console.log("New city updated");
      countryId? navigate(`/get-country/${countryId}`) : navigate(`/city`);
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };
  

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit City</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter city name"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="population" className="form-label">
                Population
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter city population"
                name="population"
                value={population}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="areaSquareKm" className="form-label">
                Area Square Km
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter city area square km"
                name="areaSquareKm"
                value={areaSquareKm}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link
              className="btn btn-outline-danger mx-2" 
              to={countryId ? `/get-country/${countryId}` : `/city`}
            >
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
