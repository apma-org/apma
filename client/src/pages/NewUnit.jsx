import React, { useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { addUnit } from "../utils/services";
import UserContext from "../context/UserContext";

export const NewUnit = () => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const { upid } = useParams();
  const [unitInfo, setUnitInfo] = useState({});

  // TODO: Add Default State

  const handleChange = (e) => {
    setUnitInfo({
      ...unitInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await addUnit({
      ...unitInfo,
      property_id: upid,
    });
    console.log(success.message);
    history.push(`/property/${upid}`);
  };

  // TODO: Input fields
  return (
    <div className="max-w-lg text-white mb-10 mx-auto bg-green-100 px-5 py-10 rounded-xl shadow-xl">
      <div className="text-center mb-8">
        <h1 className="text-2xl">Add New Unit</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mt-5">
          <label>Rent Amount</label>
          <input
            required
            type="number"
            name="rent_amount"
            className="text-gray-900 block w-full p-2 border-none rounded-lg"
            onChange={handleChange}
          />
        </div>
        {/* TODO: ADD SEARCH-BAR FOR SELECTING TENANT BY TENANT_ID */}
        <div className="mt-5">
          <label>Rent Deposit</label>
          <input
            required
            type="number"
            name="rent_deposit"
            className="text-gray-900 block w-full p-2 border-none rounded-lg"
            onChange={handleChange}
          />
        </div>
        <div className="mt-5">
          <label>Lease</label>
          <input
            type="file"
            name="lease"
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
