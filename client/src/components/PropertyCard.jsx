import React, {useState} from "react";

export const PropertyCard = () => {
  const [maintenanceRequests, setMaintenanceRequests] = useState(2);
  const [monthlyProfits, setMonthlyProfits] = useState(2000);

  return (
    <div>
      {/* Click Navigation */}
      <img src="#blob" alt="property-image"/>
      123 Bob Avenue
      Pending Requests {maintenanceRequests}
      Monthly Profit ${monthlyProfits}
    </div>
  );
};

