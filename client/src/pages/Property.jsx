import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Modal } from "../components/Modal";
import { PropertyForm } from "../components/PropertyForm";
import { UnitCard } from "../components/UnitCard";
import { UnitForm } from "../components/UnitForm";
import { getProperty, deleteProperty } from "../utils/services";

export const Property = () => {
  const history = useHistory();
  const { pid } = useParams();
  const [property, setProperty] = useState({});
  const [showEditPropertyModal, setShowEditPropertyModal] = useState(false);
  const [showDeletePropertyModal, setShowDeletePropertyModal] = useState(false);
  const [isAddingUnit, setIsAddingUnit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleEditClick = (propertyData) => {
    setShowEditPropertyModal((prev) => !prev);
    console.log(propertyData);
    if (propertyData && propertyData.address) {
      getCurrentProperty();
    }
  };

  const handleDeleteClick = () => {
    setShowDeletePropertyModal((prev) => !prev);
  };

  const handleDeleteConfirm = () => {
    const deleted = deleteProperty(pid);
    if (deleted) {
      history.push("/properties");
    }
    handleDeleteClick();
  };

  const handleAddUnitClick = () => {
    setIsAddingUnit((prevState) => !prevState);
  };

  const handleUpdate = async () => {
    setIsAddingUnit((prevState) => !prevState);
    await getCurrentProperty();
  };

  const getCurrentProperty = async () => {
    const propertyData = await getProperty(pid);
    console.log(propertyData);
    setProperty(propertyData.data);
    setIsLoading(false);
  };

  useEffect(() => {
    pid && getCurrentProperty();
  }, [pid]);

  return (
    <div className="max-w-full text-black m-10 px-5 py-5 rounded-xl shadow-xl">
      {isLoading ? (
        <div> Loading...</div>
      ) : (
        <>
          <h3 className="text-2xl block justify-center text-center m-4">
            {property.city}, {property.state} #{property.id}
          </h3>

          <div className="flex flex-row space-x-20 justify-center items-center">
            <h4 className="text-xl block justify-center text-center">
              <b>Appreciation:</b> ${property.appreciation}/month
            </h4>
            <button
              className="bg-green-100 font-bold text-sm uppercase rounded-xl p-2.5 hover:bg-green-200 text-white m-8"
              onClick={handleEditClick}
            >
              Edit Property
            </button>
            <button
              className="bg-green-100 font-bold text-sm uppercase rounded-xl p-2.5 hover:bg-green-200 text-white m-8"
              onClick={handleDeleteClick}
            >
              Delete Property
            </button>
            {!isAddingUnit ? (
              <button
                className="bg-green-100 font-bold text-sm uppercase rounded-xl p-2.5 hover:bg-green-200 text-white m-8"
                onClick={handleAddUnitClick}
              >
                Add Unit
              </button>
            ) : (
              <Modal>
                <UnitForm
                  property_id={pid}
                  close={handleUpdate}
                  isAdding={true}
                />
              </Modal>
            )}
          </div>

          <h3 className="text-2xl block justify-center text-center m-4">
            UNITS
          </h3>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-4 px-4">
            {property.units &&
              property.units.map((e) => (
                <UnitCard
                  key={e.id}
                  id={e.id}
                  property={e.property_id}
                  rent_amount={e.rent_amount}
                  rent_deposit={e.rent_deposit}
                  lease={e.lease}
                />
              ))}
          </div>
          {showEditPropertyModal && (
            <Modal close={handleEditClick}>
              <PropertyForm
                property={{ ...property, id: pid }}
                close={handleEditClick}
                isAdding={false}
              />
            </Modal>
          )}
          {showDeletePropertyModal && (
            <Modal close={handleDeleteClick}>
              <h4 className="text-xl block justify-center text-center">
                <b>Are you sure you want to delete this property?</b>
              </h4>
              <div className="flex flex-row space-x-20 justify-center items-center">
                <button
                  className="mt-10 py-3 bg-green-200 text-white w-6/12 hover:bg-green-300 rounded-xl"
                  onClick={handleDeleteConfirm}
                >
                  Confirm
                </button>
              </div>
            </Modal>
          )}
        </>
      )}
    </div>
  );
};
