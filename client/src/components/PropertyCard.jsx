import React from "react";
import { useHistory } from "react-router-dom";
import property from "../images/property.svg";

export const PropertyCard = ({
  data
}) => {
  const history = useHistory();

  const handlePropertySelection = () => {
    history.push(`/property/${data.id}`);
  };

  console.log(data)

  const getCosts = () => {
    const costs = ['maintenance_costs', 'mortgage', 'insurance', 'tax']
    var totalCosts = 0
    for(var cost of costs){
      if(data[cost]){
        totalCosts += parseInt(data[cost])
      }
    }
    return totalCosts
  }

  return (
    <button
      className="bg-gray-100 text-justify shadow-xl bg-opacity-95 flex justify-around cursor-pointer p-6 rounded-lg hover:bg-gray-200"
      onClick={handlePropertySelection}
    >
      <img className="w-16 h-16 object-cover" src={property} alt="property" />
      <div className="flex flex-col justify-center">
        <p className="font-bold">
          {data.address}
        </p>
        <p className="text-sm">Monthly Costs: ${getCosts()}</p>
        <p className="text-sm">
          Units: {data.units.length}
        </p>
      </div>
    </button>
  );
};
