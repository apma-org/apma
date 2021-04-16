import React, { useState } from "react";
import { PropertyCard } from "../components/PropertyCard";

export const Properties = () => {
  const [totalProfits, setTotalProfits] = useState(8298.23);
  const [properties, setProperties] = useState([]);

  return (
    <div>
      Properties
      <button className="bg-blue-200">Add New Property</button>
      <h3>Total Profits: ${totalProfits} / month</h3>
      <div className="bg-pink-100">
        {
          properties.map((e) => {
            <PropertyCard/>
          })
        }
      </div>
    </div>
  );
};

