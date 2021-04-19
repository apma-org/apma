import React, { useState } from "react";
import home from "./house-apma.svg";
import property from "./property.svg";

export const PropertyCard = ({
  address,
  maintenanceRequests,
  monthlyProfits,
}) => {
  return (
    <div className="bg-gray-100 border-indigo-600 dark:bg-gray-800 bg-opacity-95 border-opacity-60 | p-4 border-solid rounded-3xl border-2 | flex justify-around cursor-pointer | hover:bg-indigo-400 dark:hover:bg-indigo-600 hover:border-transparent | transition-colors duration-500">
      <img
        className="w-16 h-16 object-cover"
        src={property}
        alt="property-image"
      />
      <div className="flex flex-col justify-center">
        <p className="text-gray-900 dark:text-gray-300 font-semibold">
          {address}
        </p>
        <p className="text-black dark:text-gray-100 text-justify font-semibold">
          Pending Requests {maintenanceRequests.length}
        </p>
        <p className="text-black dark:text-gray-100 text-justify font-semibold">
          Monthly Profit ${monthlyProfits}
        </p>
      </div>
    </div>
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
