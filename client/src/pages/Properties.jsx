import React, { useState } from "react";
import { PropertyCard } from "../components/PropertyCard";

export const Properties = () => {
  const [totalProfits, setTotalProfits] = useState(8298.23);
  const [properties, setProperties] = useState([
    {
      maintenanceRequests: [
        {
          request: "Water heater is broken",
        },
        { request: "Sink is broken" },
      ],
      monthlyProfits: 4000,
    },
    {
      maintenanceRequests: [
        {
          request: "The Lights are flickering",
        },
      ],
      monthlyProfits: 3000,
    },
    {
      maintenanceRequests: [
        {
          request: "The kitchen needs to be repainted",
        },
        { request: "The cabinet door is broken" },
        { request: "The window needs washing" },
      ],
      monthlyProfits: 2500,
    },
    {
      maintenanceRequests: [
        {
          request: "The garden needs to be planted",
        },
        { request: "There is no hot water." },
      ],
      monthlyProfits: 5450,
    },
    {
      maintenanceRequests: [],
      monthlyProfits: 7450,
    },
  ]);

  return (
    <div className="max-w-full text-black m-10 px-5 py-10 rounded-xl shadow-xl">
      <div className="flex flex-row space-x-20 justify-center">
        <h3 className="text-xl block justify-center text-center m-4">
          Properties
        </h3>
        <h3 className="text-xl block justify-center text-center m-4">
          Total Profits: ${totalProfits} / month
        </h3>
        <button className="bg-green-200 rounded-3xl p-2.5 hover:bg-green-300 text-white m-8">
          Add Property
        </button>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-4 px-4">
        {properties != null &&
          properties.map((e) => (
            <PropertyCard
              maintenanceRequests={e.maintenanceRequests}
              monthlyProfits={e.monthlyProfits}
            />
          ))}
      </div>
    </div>
  );
};
