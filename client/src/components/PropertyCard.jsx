import React, { useState } from "react";
import home from "./house-apma.svg";
import property from "./property.svg";

export const PropertyCard = ({
  address,
  maintenanceRequests,
  monthlyProfits,
}) => {
  return (
    <button className="bg-gray-100 text-justify shadow-xl bg-opacity-95 flex justify-around cursor-pointer p-6 rounded-lg hover:bg-gray-200">
      <img className="w-16 h-16 object-cover" src={property} alt="property" />
      <div className="flex flex-col justify-center">
        <p className="font-bold">{address}</p>
        <p className="text-sm">
          Pending Requests: {maintenanceRequests.length}
        </p>
        <p className="text-sm">Monthly Profit: ${monthlyProfits}</p>
      </div>
    </button>
  );
};

{
  /* Click Navigation */
}
{
  /* <img className="w-12 h-12 bg-white" src={property} alt="property-image" />
{address} Pending Requests {maintenanceRequests.length}
<div>
  {maintenanceRequests &&
    maintenanceRequests.map((e, idx) => {
      <p>
        Request #{idx}, "{e.request}"
      </p>;
    })}
</div>
Monthly Profit ${monthlyProfits} */
}
