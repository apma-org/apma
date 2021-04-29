import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getProperty, deleteProperty } from "../utils/services";
import { Header } from "../components/Header";
import { Modal } from "../components/Modal";
import { DeleteModal } from "../components/ModalTypes";
import { PropertyForm } from "../components/PropertyForm";
import { UnitCard } from "../components/UnitCard";
import { UnitForm } from "../components/UnitForm";

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
    setProperty(propertyData.data);
    setIsLoading(false);
  };

  useEffect(() => {
    pid && getCurrentProperty();
  }, [pid]);

  return (
    <div className="max-w-full text-black m-10 px-5 py-5 pb-10 rounded-xl shadow-xl">

      {isLoading ? (
        <div> Loading...</div>
      ) : (
        <>
          <h3 className="text-2xl block justify-center text-center m-4">
            {property.city}, {property.state} #{property.id}
            <br />
            Appreciation:${property.appreciation}/month
          </h3>

          <div className="flex flex-row justify-center items-center">
            <button
              className="bg-green-100 font-bold text-sm uppercase rounded-xl hover:bg-green-200 text-white p-2 m-4 shadow-lg"
              onClick={handleEditClick}
            >
              Edit Property
            </button>
            <button
              className="bg-green-100 font-bold text-sm uppercase rounded-xl hover:bg-green-200 text-white p-2 m-4 shadow-lg"
              onClick={handleDeleteClick}
            >
              Delete Property
            </button>
            {!isAddingUnit ? (
              <button
                className="bg-green-100 font-bold text-sm uppercase rounded-xl  hover:bg-green-200 text-white p-2 m-4 shadow-lg"
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
            <DeleteModal
              handleModalClick={handleDeleteClick}
              handleDeleteConfirm={handleDeleteConfirm}
              obType={`property`}
            />
          )}
        </>
      )}
    </div>
  );
};
