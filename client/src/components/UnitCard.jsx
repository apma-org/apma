import React, {useState} from "react";

export const UnitCard = ({ occupied, tenantName, rent, maintenanceRequests, unpaid }) => {
  return (
    <div className="bg-pink-300">
      Unit 1
      Status: {occupied}
      Tenant: {tenantName}
      Rent: {rent}
      Maintenance Requests: {maintenanceRequests}
      Unpaid: {unpaid}
    </div>
  );
};

