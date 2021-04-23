import React from "react";
import { useHistory } from "react-router";

export const UnitCard = ({
  id,
  property,
  rent_amount,
  rent_deposit,
  lease,
}) => {
  const history = useHistory();

  const handleUnitSelection = () => {
    history.push(`/unit/${id}`);
  };

  return (
    <button
      className="bg-gray-100 text-justify shadow-xl bg-opacity-95 flex justify-around cursor-pointer p-6 rounded-lg hover:bg-gray-200 text-sm"
      onClick={handleUnitSelection}
    >
      <div className="overflow-hidden">
        <p className="font-bold">Unit: # {id}</p>
        <p>Property: {property}</p>
        <p>Rent Amount: {rent_amount}</p>
        <p>Rent Deposit: {rent_deposit}</p>
        <p>Unpaid: {rent_amount - rent_deposit}</p>
        <p>Lease: {lease}</p>
      </div>
    </button>
  );
};
