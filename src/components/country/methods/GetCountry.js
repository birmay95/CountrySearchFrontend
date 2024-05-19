import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const apiUrl = "https://countrysearch.onrender.com";

export default function GetCountry() {
    const [country, setCountry] = useState({
        name: "",
        capital: "",
        population: "",
        areaSquareKm: "",
        gdp: "",
        cities: [],
        nations: []
      });

  const { countryId } = useParams();

  useEffect(() => {
    loadCountry();
  // eslint-disable-next-line
}, []);

  const loadCountry = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/country/${countryId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCountry(data);
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
    }
  };

  const deleteCity = async (cityId) => {
    try {
      await fetch(`${apiUrl}/api/countries/${countryId}/cities/${cityId}`, {
        method: 'DELETE'
      });
      loadCountry();
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
    }
  };

  const deleteAllCities = async () => {
    try {
      await fetch(`${apiUrl}/api/countries/${countryId}/cities`, {
        method: 'DELETE'
      });
      loadCountry();
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
    }
  };

  const deleteNation = async (nationId) => {
    try {
      await fetch(`${apiUrl}/api/countries/${countryId}/nations/${nationId}`, {
        method: 'DELETE'
      });
      loadCountry();
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Country Details</h2>
  
          <div className="card">
            <div className="card-header">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Name: </b>
                  {country.name}
                </li>
                <li className="list-group-item">
                  <b>Capital: </b>
                  {country.capital}
                </li>
                <li className="list-group-item">
                  <b>Population: </b>
                  {country.population}
                </li>
                <li className="list-group-item">
                  <b>AreaSquareKm: </b>
                  {country.areaSquareKm}
                </li>
                <li className="list-group-item">
                  <b>GDP: </b>
                  {country.gdp}
                </li>
              </ul>
            </div>
          </div>
          <li className="list-group-item">
            <b>Cities: </b>
            </li>
            <div className="text-end">
            <button
          className="btn btn-danger mx-2"
          onClick={() => deleteAllCities()}
        >
        Delete All Cities
        </button>
            <Link className="btn btn-primary my-2" to={`/add-city/${countryId}`}>
            Add City
          </Link>
        </div>
          <table className="table border shadow">
            <thead>
              <tr>
                <th scope="col">S.N</th>
                <th scope="col">Name</th>
                <th scope="col">Population</th>
                <th scope="col">Area Square Km</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {country.cities.map((city, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{city.name}</td>
                  <td>{city.population}</td>
                  <td>{city.areaSquareKm}</td>
                  <td>
                    <Link
                      className="btn btn-outline-primary mx-2"
                      to={`/edit-city/${city.id}/in-country/${countryId}`}
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => deleteCity(city.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <li className="list-group-item">
            <b>Nations: </b>
            </li>
            <div className="text-end">
            <Link className="btn btn-primary my-2" to={`/add-nation/${countryId}`}>
            Add Nation
          </Link>
          </div>
          <table className="table border shadow">
            <thead>
              <tr>
                <th scope="col">S.N</th>
                <th scope="col">Name</th>
                <th scope="col">Language</th>
                <th scope="col">Religion</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {country.nations.map((nation, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{nation.name}</td>
                  <td>{nation.language}</td>
                  <td>{nation.religion}</td>
                  <td>
                    <Link
                      className="btn btn-outline-primary mx-2"
                      to={`/edit-nation/${nation.id}/in-country/${countryId}`}
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => deleteNation(nation.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
  
          <Link className="btn btn-primary my-2" to={"/country"}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
  
}
