import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { editProperty } from "../utils/services";

export const EditUnit = ({ rent_amount, rent_deposit, lease }) => {
  const history = useHistory();
  const { upid } = useParams();
  const [unitInfo, setUnitInfo] = useState({
    rent_amount,
    rent_deposit,
    lease,
  });

  // TODO: Grab OwnerId
  // TODO: Redirect to /property/:propertyId

  const handleChange = ({ target: { name, value } }) => {
    setUnitInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (unitInfo) {
      // const originalUnit = await getUnit(unitId);
      const unit = await editProperty(unitInfo, unitInfo.id, upid);
      setUnitInfo(unit);
      history.push(`/unit/${upid}`);
    }
  };

  // TODO: Input fields
  return (
    <div className="max-w-lg text-white mb-10 mx-auto bg-green-100 px-5 py-10 rounded-xl shadow-xl">
      <div className="text-center mb-8">
        <h1 className="text-2xl">Edit Unit</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mt-5">
          <label>Rent Amount</label>
          <input
            required
            type="number"
            name="rent_amount"
            value={unitInfo.rent_amount || "iun"}
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
            type="text"
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
