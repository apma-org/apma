import React, { useState } from "react";
import { Expenses } from '../components/Expenses'
import { UnitCard } from "../components/UnitCard";

export const Property = () => {
  const [totalProfits, setTotalProfits] = useState(8298.23);
  const [units, setUnits] = useState({});

  return (
    <div className="bg-red-300">
      Property 123 Bob Avenue

      <button className="bg-blue-200">Edit Property</button>
      <h3>Total Profits: ${totalProfits} / month</h3>
      <Expenses/>
      <div>
        {
        units.map((e, idx) => {
          <UnitCard key={idx} occupied={e.occupied} tenantName={e.tenantName} rent= {e.rent} maintenanceRequests={e.maintenanceRequests} unpaid = {e.unpaid} />
        })
        }
      </div>
    </div>
  );
};
