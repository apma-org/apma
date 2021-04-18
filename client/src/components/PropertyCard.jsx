import React, { useState } from "react";

export const PropertyCard = ({ maintenanceRequests, monthlyProfits }) => {
  return (
    <div className="text-black bg-blue-300 w-30">
      {/* Click Navigation */}
      <img src="#blob" alt="property-image" />
      123 Bob Avenue Pending Requests {maintenanceRequests.length}
      <div>
        {maintenanceRequests &&
          maintenanceRequests.map((e, idx) => {
            <p>
              Request #{idx}, "{e.request}"
            </p>;
          })}
      </div>
      Monthly Profit ${monthlyProfits}
    </div>
  );
};
