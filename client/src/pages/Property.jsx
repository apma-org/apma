import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getProperty, deleteProperty, getUnit } from "../utils/services";
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
    var propertyData = await getProperty(pid);
    var propertyData = propertyData.data
    var unitList = []
    for(var unit of propertyData.units){
      const unitData = await getUnit(unit.id)
      unitList.push(unitData.data)
    }
    propertyData.units = unitList
    setProperty(propertyData);
    setIsLoading(false);
  };

  console.log(property)

  useEffect(() => {
    pid && getCurrentProperty();
  }, [pid]);

  const getRevenue = () => {
    var sum = 0;
    for(var unit of property.units){
      if(unit.tenant){
        sum += parseInt(unit.rent_amount)
      }
    }
    return sum
  }

  const getPotentialRevenue = () => {
    var sum = 0;
    for(var unit of property.units){
      sum += parseInt(unit.rent_amount)
    }
    return sum
  }

  const getTotalCosts = () => {
    return parseInt(property.mortgage) + parseInt(property.tax) + parseInt(property.insurance) + parseInt(property.maintenance_costs || "0")
  }

  return (
    <div className="max-w-full text-black m-10 px-5 py-5 pb-10 rounded-xl shadow-xl">

      {isLoading ? (
        <div> Loading...</div>
      ) : (
        <>
          <h3 className="text-2xl block justify-center text-center m-4">
            {property.address}, {property.city}, {property.state}
          </h3>
          <h3 className="text-1xl block justify-center text-center m-4">
            Mortgage: ${property.mortgage}/month <br/>
            Tax: ${property.tax}/month <br/>
            Insurance: ${property.insurance}/month <br/>
            Maintenance Costs: ${property.maintenance_costs || "0.00"}/month <br/>
          </h3>
          <h3 className="text-1xl block justify-center text-center m-4">
            Total Costs: ${getTotalCosts()}/month <br/>
            Total Revenue: ${getRevenue()}/month <br/>
            Total Potential Revenue: ${getPotentialRevenue()}/month
          </h3>
          <h3 className="text-1xl block justify-center text-center m-4">
            Total Profit: ${getRevenue() - getTotalCosts()}/month <br/>
            Total Potential Profit: ${getPotentialRevenue() - getTotalCosts()}/month <br/>
          </h3>
          <div className="flex flex-row justify-center items-center">
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
          </div>

          <h3 className="text-2xl block justify-center text-center m-4">
            UNITS
          </h3>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-4 px-4">
            {property.units &&
              property.units.map((e) => (
                <UnitCard
                  key={e.id}
                  data={e}
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
