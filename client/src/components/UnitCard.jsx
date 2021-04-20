import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";

export const UnitCard = ({
  key,
  occupied,
  tenantName,
  rent,
  maintenanceRequests,
  unpaid,
}) => {
  const history = useHistory();
  const [unitNumber, setUnitNumber] = useState(-1); // TODO: key's value currently passes as undefined

  useEffect(() => {
    setUnitNumber(key);
  }, [key]);

  const handleUnitSelection = () => {
    history.push("/unit");
  };

  return (
    <button
      className="bg-gray-100 text-justify shadow-xl bg-opacity-95 flex justify-around cursor-pointer p-6 rounded-lg hover:bg-gray-200 text-sm"
      onClick={handleUnitSelection}
    >
      <div className="flex flex-col justify-center">
        <p className="font-bold">Unit: # {unitNumber}</p>
        <p>Status: {occupied}</p>
        <p>Tenant: {tenantName}</p>
        <p>Rent: {rent}</p>
        <p>Maintenance Requests: {maintenanceRequests}</p>
        <p>Unpaid: {unpaid}</p>
      </div>
    </button>
  );
};
