import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export const EditProperty = () => {
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
        <h1 className="text-2xl">Edit Property</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mt-5">
          <label>Address</label>
          <input
            required
            type="text"
            name="address"
            defaultValue={propertyInfo.address || null}
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
            defaultValue={propertyInfo.city || null}
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
            defaultValue={propertyInfo.state || null}
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
            defaultValue={propertyInfo.mortgage || null}
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
            defaultValue={propertyInfo.tax || null}
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
            defaultValue={propertyInfo.insurance || null}
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
            defaultValue={propertyInfo.appreciation || null}
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
