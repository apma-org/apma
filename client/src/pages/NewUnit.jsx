import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { addUnit } from "../utils/services";
import UserContext from "../context/UserContext";

export const NewUnit = () => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const [unitInfo, setUnitInfo] = useState({});

  // TODO: Grab OwnerId
  // TODO: Redirect to /property/:propertyId
  // TODO: Add Default State

  const handleChange = (e) => {
    setUnitInfo({
      ...unitInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("unit info", unitInfo);
    const success = await addUnit({
      ...unitInfo,
      landowner_id: user.id,
    });
    console.log("added property /NewUnit", success);
    history.push("/unit");
  };

  // TODO: Input fields
  return (
    <div className="max-w-lg text-white mb-10 mx-auto bg-green-100 px-5 py-10 rounded-xl shadow-xl">
      <div className="text-center mb-8">
        <h1 className="text-2xl">Add New Unit</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mt-5">
          <label>Status</label>
          <input
            required
            type="text"
            name="address"
            className="text-gray-900 block w-full p-2 border-none rounded-lg"
            onChange={handleChange}
          />
        </div>
        {/* TODO: ADD SEARCH-BAR FOR SELECTING TENANT BY TENANT_ID */}
        <div className="mt-5">
          <label>Tenant</label>
          <input
            required
            type="text"
            name="city"
            className="text-gray-900 block w-full p-2 border-none rounded-lg"
            onChange={handleChange}
          />
        </div>
        <div className="mt-5">
          <label>Rent</label>
          <input
            required
            type="text"
            name="state"
            className="text-gray-900 block w-full p-2 border-none rounded-lg"
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="mt-10 py-3 bg-green-200 text-white w-full hover:bg-green-300 rounded-xl"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
