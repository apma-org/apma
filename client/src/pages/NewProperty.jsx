import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export const NewProperty = () => {
  const history = useHistory();
  const [propertyInfo, setPropertyInfo] = useState({});

  // TODO: Grab OwnerId
  // TODO: Redirect to /property/:propertyId

  const handleChange = (e) => {
    setPropertyInfo({
      ...propertyInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("property info", propertyInfo);
    history.push("/property");
    // history.push("/property/##");
  };

  // TODO: Input fields
  return (
    <div className="max-w-lg text-white mb-10 mx-auto bg-green-100 px-5 py-10 rounded-xl shadow-xl">
      <div className="text-center mb-8">
        <h1 className="text-2xl">Add New Property</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mt-5">
          <label>Address</label>
          <input
            required
            type="text"
            name="address"
            className="text-gray-900 block w-full p-2 border-none rounded-lg"
            onChange={handleChange}
          />
        </div>
        <div className="mt-5">
          <label>City</label>
          <input
            required
            type="text"
            name="city"
            className="text-gray-900 block w-full p-2 border-none rounded-lg"
            onChange={handleChange}
          />
        </div>
        <div className="mt-5">
          <label>State</label>
          <input
            required
            type="text"
            name="state"
            className="text-gray-900 block w-full p-2 border-none rounded-lg"
            onChange={handleChange}
          />
        </div>
        <div className="mt-5">
          <label>Mortgage</label>
          <input
            required
            type="number"
            name="mortgage"
            className="text-gray-900 block w-full p-2 border-none rounded-lg"
            onChange={handleChange}
          />
        </div>
        <div className="mt-5">
          <label>Tax</label>
          <input
            required
            type="number"
            name="tax"
            className="text-gray-900 block w-full p-2 border-none rounded-lg"
            onChange={handleChange}
          />
        </div>
        <div className="mt-5">
          <label>Insurance</label>
          <input
            required
            type="number"
            name="insurance"
            className="text-gray-900 block w-full p-2 border-none rounded-lg"
            onChange={handleChange}
          />
        </div>
        <div className="mt-5">
          <label>Appreciation</label>
          <input
            required
            type="number"
            name="appreciation"
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
