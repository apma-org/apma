import React from "react";
import { useHistory } from "react-router-dom";
import property from "../images/property.svg";

export const PropertyCard = ({
  id,
  key,
  address,
  maintenanceRequests,
  monthlyProfits,
}) => {
  const history = useHistory();

  const handlePropertySelection = () => {
    // history.push(`/properties/${propertyNumber}`);
    history.push(`/property`);
  };

  return (
    <button
      className="bg-gray-100 text-justify shadow-xl bg-opacity-95 flex justify-around cursor-pointer p-6 rounded-lg hover:bg-gray-200"
      onClick={handlePropertySelection}
    >
      <img className="w-16 h-16 object-cover" src={property} alt="property" />
      <div className="flex flex-col justify-center">
        <p className="font-bold">
          {address} #{id}
        </p>
        <p className="text-sm">
          Pending Requests: {maintenanceRequests && maintenanceRequests.length}
        </p>
        <p className="text-sm">Monthly Profit: ${monthlyProfits}</p>
      </div>
    </button>
  );
};
