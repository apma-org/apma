import React, { useState } from "react";
import { addUnit, editUnit } from "../utils/services";

export const UnitForm = ({
  unit_id,
  property_id,
  rent_amount,
  rent_deposit,
  lease,
  close,
  isAdding,
}) => {
  const [unitInfo, setUnitInfo] = useState(
    unit_id
      ? {
          rent_amount,
          rent_deposit,
          lease,
        }
      : {
          rent_amount: undefined,
          rent_deposit: undefined,
          lease: "",
        }
  );
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = ({ target: { name, value } }) => {
    setUnitInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (unitInfo) {
      try {
        const data = isAdding
          ? await addUnit({ ...unitInfo, property_id: property_id })
          : await editUnit(unitInfo, unit_id, property_id);
        close(data);
      } catch {
        setErrorMessage(
          "An error occured. Please double check all input fields. Rent Amount and Rent Deposit should be number values. Apostrophes are currently not accepted."
        );
      }
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
          defaultValue={rent_amount || undefined}
          className="text-gray-900 block w-full p-2 border-none rounded-lg"
          onChange={handleChange}
        />
      </div>
      <div className="mt-5">
        <label>Rent Deposit</label>
        <input
          required
          type="number"
          step="0.01"
          name="rent_deposit"
          defaultValue={rent_deposit || undefined}
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
      {errorMessage && (
        <p className="text-red-600 mt-4 p-4 bg-gray-100">{errorMessage}</p>
      )}
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
