import React, { useState, useEffect } from "react";
import { Modal } from "../components/Modal";
import { PropertyCard } from "../components/PropertyCard";
import { PropertyForm } from "../components/PropertyForm";
import { getLandowner } from "../utils/services";

export const Properties = () => {
  const currentUserId = localStorage.getItem("currentUserId");

  const [properties, setProperties] = useState([]);
  const [isAddingProperty, setIsAddingProperty] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleAddForm = () => {
    setIsAddingProperty((prevState) => !prevState);
  };

  const handleUpdate = async (property) => {
    setIsAddingProperty((prevState) => !prevState);
    await getProperties();
  };

  const getProperties = async () => {
    const u = await getLandowner(currentUserId);
    u && setProperties(u.data.properties);
    setIsLoading(false);
  };

  useEffect(() => {
    currentUserId && getProperties();
  }, [currentUserId]);

  return (
    <div className="max-w-full text-black m-10 px-5 py-5 rounded-xl shadow-xl">
      <h3 className="text-2xl block justify-center text-center">Properties</h3>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="flex flex-row space-x-20 justify-center items-center">
            {!isAddingProperty ? (
              <button
                onClick={handleAddForm}
                className="bg-green-100 font-bold text-sm uppercase rounded-xl p-2.5 hover:bg-green-200 text-white m-8"
              >
                Add Property
              </button>
            ) : (
              <Modal close={handleAddForm}>
                <PropertyForm
                  close={handleUpdate}
                  isAdding={true}
                  userId={currentUserId}
                />
              </Modal>
            )}
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-4 p-4 pb-6">
            {properties.length >= 1 &&
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
        </>
      )}
    </div>
  );
};
