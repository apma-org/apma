import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { UnitCard } from "../components/UnitCard";
import { getProperty } from "../utils/services";

export const Property = ({
  id,
  address,
  maintenanceRequests,
  monthlyProfits,
}) => {
  const history = useHistory();
  const { pid } = useParams();
  const [property, setProperty] = useState({});

  // TODO: FIX passing data to forms
  // TODO: Abstract to a component, and pass along property details
  const handleEditProperty = () => {
    history.push("/editProperty");
  };

  const handleAddUnit = () => {
    history.push(`/addUnit/${pid}`);
  };

  const getCurrentProperty = async () => {
    const propertyData = await getProperty(pid);
    console.log(propertyData);
    setProperty(propertyData.data);
  };

  useEffect(() => {
    pid && getCurrentProperty();
  }, [pid]);

  return (
    <div className="max-w-full text-black m-10 px-5 py-5 rounded-xl shadow-xl">
      <h3 className="text-2xl block justify-center text-center m-4">
        {property.city}, {property.state} #{property.id}
      </h3>

      <div className="flex flex-row space-x-20 justify-center items-center">
        <h4 className="text-xl block justify-center text-center">
          <b>Appreciation:</b> ${property.appreciation}/month
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
        {property.units &&
          property.units.map((e) => (
            <UnitCard
              key={e.id}
              id={e.id}
              property={e.property_id}
              rent={e.rent_amount}
              lease={e.lease}
            />
          ))}
      </div>
    </div>
  );
};
