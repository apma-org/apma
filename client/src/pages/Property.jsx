import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
// import { Expenses } from "../components/Expenses";
import { UnitCard } from "../components/UnitCard";

export const Property = () => {
  const history = useHistory();
  const { propertyId } = useParams();
  const [totalProfits, setTotalProfits] = useState(8298.23);
  // const [units, setUnits] = useState([
  //   {
  //     rent: 5000,
  //     occupied: true,
  //     tenantName: "Bob",
  //     maintenanceRequests: 0,
  //     unpaid: 100,
  //   },
  //   {
  //     rent: 2000,
  //     occupied: true,
  //     tenantName: "Trudy",
  //     maintenanceRequests: 0,
  //     unpaid: 1000,
  //   },
  //   {
  //     rent: 1000,
  //     occupied: true,
  //     tenantName: "Ever",
  //     maintenanceRequests: 0,
  //     unpaid: 500,
  //   },
  //   {
  //     rent: 5500,
  //     occupied: true,
  //     tenantName: "Marley",
  //     maintenanceRequests: 0,
  //     unpaid: 0,
  //   },
  // ]);

  // TODO: Abstract to a component, and pass along property details
  // TODO: Look into useParams as alt.
  const handleEditProperty = () => {
    history.push("/editProperty");
  };

  const handleAddUnit = () => {
    history.push("/addUnit");
  };

  return (
    <div className="max-w-full text-black m-10 px-5 py-5 rounded-xl shadow-xl">
      <h3 className="text-2xl block justify-center text-center m-4">
        123 Bob Avenue, #{propertyId}
      </h3>

      <div className="flex flex-row space-x-20 justify-center items-center">
        <h4 className="text-xl block justify-center text-center">
          <b>Total Profits:</b> ${totalProfits}/month
        </h4>
        <button
          className="bg-green-100 font-bold text-sm uppercase rounded-xl p-2.5 hover:bg-green-200 text-white m-8"
          onClick={handleEditProperty}
        >
          Edit Property
        </button>
        <button
          className="bg-green-100 font-bold text-sm uppercase rounded-xl p-2.5 hover:bg-green-200 text-white m-8"
          onClick={handleAddUnit}
        >
          Add Unit
        </button>
      </div>

      {/* <Expenses /> */}

      <h3 className="text-2xl block justify-center text-center m-4">UNITS</h3>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-4 px-4">
        {units &&
          units.map((e, idx) => (
            <UnitCard
              key={idx}
              occupied={e.occupied}
              tenantName={e.tenantName}
              rent={e.rent}
              maintenanceRequests={e.maintenanceRequests}
              unpaid={e.unpaid}
            />
          ))}
      </div>
    </div>
  );
};
