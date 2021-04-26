import React, { useState } from "react";
import { editProperty } from "../utils/services";

export const PropertyForm = ({ property , close}) => {
  const [propertyInfo, setPropertyInfo] = useState({
    ...property,
  });

  const handleChange = ({ target: { name, value } }) => {
    console.log("value changed");
    setPropertyInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("property info", propertyInfo);
    if (propertyInfo) {
      const property = await editProperty(propertyInfo, propertyInfo.id);
      setPropertyInfo(property);
      close(property);
    }
  };

  // TODO: In progress
  const CustomInput = ({ name, type, value, onChange }) => {
    if (type === "number") {
      onChange = (e) => {
        e.target.value = e.target.value.replace(/^\d+\.\d{0,2}$/, "");
        onChange(e);
      };
    }
    return (
      <div className="mt-5">
        <label style={{ textTransform: "capitalize" }}>{name}</label>
        <input
          required
          type="text"
          name={name}
          value={value}
          className="text-gray-900 block w-full p-2 border-none rounded-lg"
          onChange={onChange}
        />
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* {Object.entries(propertyInfo).map(([key, value]) => (
        <CustomInput
          name={key}
          type="text"
          value={value}
          onChange={handleChange}
        />
      ))} */}
      <div className="mt-5">
        <label>Address</label>
        <input
          required
          type="text"
          name="address"
          value={propertyInfo.address}
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
          value={propertyInfo.city}
          className="text-gray-900 block w-full p-2 border-none rounded-lg"
          onChange={handleChange}
        />
      </div>
      <div className="mt-5">
        <label>Zipcode</label>
        <input
          required
          type="text"
          name="zipcode"
          value={propertyInfo.zipcode}
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
          value={propertyInfo.state}
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
          value={propertyInfo.mortgage}
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
          value={propertyInfo.tax}
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
          value={propertyInfo.insurance}
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
          value={propertyInfo.appreciation}
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
  );
};
