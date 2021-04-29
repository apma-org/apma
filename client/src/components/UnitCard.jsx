import React from "react";
import { useHistory } from "react-router";

export const UnitCard = ({
  data
}) => {
  const history = useHistory();

  const handleUnitSelection = () => {
    history.push(`/unit/${data.id}`);
  };

  return (
    <button
      className="bg-gray-100 text-justify shadow-xl bg-opacity-95 flex justify-around cursor-pointer p-6 rounded-lg hover:bg-gray-200 text-sm"
      onClick={handleUnitSelection}
    >
      <div className="overflow-hidden">
        <p className="font-bold">Unit: {data.id}</p>
        <p>Rent Amount: ${data.rent_amount}</p>
        <p>Rent Deposit: ${data.rent_deposit}</p>
        <p>Tenant: {data.tenant ? `${data.tenant.first_name} ${data.tenant.last_name}` : "Vacant"} </p>
        <p>Pending Maintenance: {data.maintenance.filter(m => m.date_fixed == null).length}</p>
      </div>
    </button>
  );
};
