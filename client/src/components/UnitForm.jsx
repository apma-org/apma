import React, { useState } from "react";
import { editProperty } from "../utils/services";

export const UnitForm = ({
  unit_id,
  property_id,
  rent_amount,
  rent_deposit,
  lease,
}) => {
  const [unitInfo, setUnitInfo] = useState({
    rent_amount,
    rent_deposit,
    lease,
  });

  const handleChange = ({ target: { name, value } }) => {
    setUnitInfo((prevState) => ({ ...prevState, [name]: value }));
    // if (name === "rent_deposit") value = value.replace(/^\d+\.\d{0,2}$/, "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("FORUM", { ...unitInfo, property_id: property_id });
    if (unitInfo) {
      const data = await editProperty(unitInfo, unit_id, property_id);
      console.log("blah", data);
    }
  };

  return (
    <form className="text-greens-900" onSubmit={() => handleSubmit(unitInfo)}>
      <div className="mt-5">
        <label>Rent Amount</label>
        <input
          required
          type="number"
          step="0.01"
          name="rent_amount"
          defaultValue={rent_amount || 0.0}
          className="text-gray-900 block w-full p-2 border-none rounded-lg"
          onChange={handleChange}
        />
      </div>
      {/* TODO: ADD SEARCH-BAR FOR SELECTING TENANT BY TENANT_ID */}
      <div className="mt-5">
        <label>Rent Deposit</label>
        <input
          required
          type="text"
          step="0.01"
          name="rent_deposit"
          defaultValue={rent_deposit || 0.0}
          className="text-gray-900 block w-full p-2 border-none rounded-lg"
          onChange={handleChange}
        />
      </div>
      <div className="mt-5">
        <label>Lease</label>
        <input
          type="text"
          name="lease"
          defaultValue={lease || ""}
          className="text-gray-900 block w-full p-2 border-none rounded-lg"
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        className="mt-10 py-3 bg-green-200 text-white w-full hover:bg-green-300 rounded-xl"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </form>
  );
};
