import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditCountry() {
  const navigate = useNavigate();
  const { id, nationId } = useParams();

  const [country, setCountry] = useState({
    name: "",
    capital: "",
    population: "",
    areaSquareKm: "",
    gdp: ""
  });

  const { name, capital, population, areaSquareKm, gdp } = country;

  const onInputChange = (e) => {
    setCountry({ ...country, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const loadCountry = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/country/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCountry(data);
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
      }
    };
  
    loadCountry();
  }, [id]); // Добавленная зависимость
  

  const onSubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:8080/api/country/${id}?name=${country.name}&capital=${country.capital}&population=${country.population}&areaSquareKm=${country.areaSquareKm}&gdp=${country.gdp}`;
  
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
  
      console.log("New country updated");
      nationId? navigate(`/get-countries-from-nation/${nationId}`) : navigate('/country');
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };
  

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Country</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter country name"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="capital" className="form-label">
                Capital
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter country capital"
                name="capital"
                value={capital}
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
                placeholder="Enter country population"
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
                placeholder="Enter country area square km"
                name="areaSquareKm"
                value={areaSquareKm}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="gdp" className="form-label">
                GDP
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter country GDP"
                name="gdp"
                value={gdp}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link
              className="btn btn-outline-danger mx-2" 
              to={nationId? `/get-countries-from-nation/${nationId}` : "/country"}
            >
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
