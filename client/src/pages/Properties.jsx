import React, { useState, useEffect } from "react";
import { PropertyCard } from "../components/PropertyCard";
import { useHistory } from "react-router-dom";
import { getLandowner } from "../utils/services";

export const Properties = () => {
  const history = useHistory();
  const currentUserId = localStorage.getItem("currentUserId");

  const [properties, setProperties] = useState([]);

  const handleAddForm = () => {
    history.push("/addProperty");
  };

  const getProperties = async () => {
    const u = await getLandowner(currentUserId);
    u && setProperties(u.data.properties);
  };

  useEffect(() => {
    currentUserId && getProperties();
  }, []);

  return (
    <div className="max-w-full text-black m-10 px-5 py-5 rounded-xl shadow-xl">
      <h3 className="text-2xl block justify-center text-center">Properties</h3>
      <div className="flex flex-row space-x-20 justify-center items-center">
        {/*
        <h3 className="text-xl block justify-center text-center m-4">
          {<b>Total Profits:</b> ${totalProfits}/month }
        </h3>
        */}
        <button
          onClick={handleAddForm}
          className="bg-green-100 font-bold text-sm uppercase rounded-xl p-2.5 hover:bg-green-200 text-white m-8"
        >
          Add Property
        </button>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-4 p-4 pb-6">
        {properties != null &&
          properties.map((e, idx) => (
            <PropertyCard
              key={idx}
              id={e.id}
              address={e.address}
              maintenanceRequests={e.maintenanceRequests}
              monthlyProfits={e.monthlyProfits}
            />
          ))}
      </div>
    </div>
  );
};
