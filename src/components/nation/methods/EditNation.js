import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const apiUrl = "https://countrysearchfrontend.onrender.com";

export default function EditCountry() {
  const navigate = useNavigate();
  const { nationId, countryId } = useParams();

  const [nation, setNation] = useState({
    name: "",
    language: "",
    religion: ""
  });

  const { name, language, religion } = nation;

  const onInputChange = (e) => {
    setNation({ ...nation, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const url = `${apiUrl}/api/nations/${nationId}?name=${nation.name}&language=${nation.language}&religion=${nation.religion}`;
  
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
  
      console.log("New nation updated");
      countryId? navigate(`/get-country/${countryId}`) : navigate(`/nation`);

    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };
  

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Nation</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter nation name"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="language" className="form-label">
                Language
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter nation language"
                name="language"
                value={language}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="religion" className="form-label">
                Religion
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter nation religion"
                name="religion"
                value={religion}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link
              className="btn btn-outline-danger mx-2" 
              to={countryId ? `/get-country/${countryId}` : `/nation`}
            >
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
