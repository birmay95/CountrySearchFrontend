import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const apiUrl = "https://countrysearchfrontend.onrender.com";

export default function GetNation() {
    const [countries, setCountries] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadCountriesFromNation();
  // eslint-disable-next-line
}, []);

  const loadCountriesFromNation = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/nations/${id}/countries`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const text = await response.text();
      const data = text ? JSON.parse(text) : [];
      setCountries(data);
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
    }
  };

  const deleteNation = async (countryId) => {
    try {
      await fetch(`${apiUrl}/api/countries/${countryId}/nations/${id}`, {
        method: 'DELETE'
      });
      loadCountriesFromNation();
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-10 offset-md-1 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Nation Countries</h2>
          {countries && countries.map((country, index) => (
            <div key={index}>
              <h3>{country.name}</h3>
              <table className="table border shadow">
                <thead>
                  <tr>
                    <th scope="col">S.N</th>
                    <th scope="col">Name</th>
                    <th scope="col">Capital</th>
                    <th scope="col">Population</th>
                    <th scope="col">Area Square Km</th>
                    <th scope="col">GDP</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{country.name}</td>
                    <td>{country.capital}</td>
                    <td>{country.population}</td>
                    <td>{country.areaSquareKm}</td>
                    <td>{country.gdp}</td>
                    <td>
                      <Link
                        className="btn btn-outline-primary mx-2"
                        to={`/edit-country/${country.id}/in-nation/${id}`}
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-danger mx-2"
                        onClick={() => deleteNation(country.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
  
              <div className="row">
                <div className="col">
                  <h6>Cities:</h6>
                  <table className="table border shadow">
                    <thead>
                      <tr>
                        <th scope="col">S.N</th>
                        <th scope="col">Name</th>
                        <th scope="col">Population</th>
                        <th scope="col">Area Square Km</th>
                      </tr>
                    </thead>
                    <tbody>
                      {country.cities.map((city, cityIndex) => (
                        <tr key={cityIndex}>
                          <td>{cityIndex + 1}</td>
                          <td>{city.name}</td>
                          <td>{city.population}</td>
                          <td>{city.areaSquareKm}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
  
              <div className="row">
                <div className="col">
                  <h6>Nations:</h6>
                  <table className="table border shadow">
                    <thead>
                      <tr>
                        <th scope="col">S.N</th>
                        <th scope="col">Name</th>
                        <th scope="col">Language</th>
                        <th scope="col">Religion</th>
                      </tr>
                    </thead>
                    <tbody>
                      {country.nations.map((nation, nationIndex) => (
                        <tr key={nationIndex}>
                          <td>{nationIndex + 1}</td>
                          <td>{nation.name}</td>
                          <td>{nation.language}</td>
                          <td>{nation.religion}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
  
          <Link className="btn btn-primary my-2" to={"/nation"}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
  
  
}
