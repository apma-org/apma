import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { MaintenanceForm } from "../components/MaintenanceForm";
import { Modal } from "../components/Modal";
import { UnitForm } from "../components/UnitForm";
import { getUnit, deleteUnit } from "../utils/services";

export const Unit = () => {
  const history = useHistory();
  const { uid } = useParams();
  const [unit, setUnit] = useState({});
  const [showEditUnitModal, setShowEditUnitModal] = useState(false);
  const [showEditRequestModal, setShowEditRequestModal] = useState(false);
  const [showDeleteUnitModal, setShowDeleteUnitModal] = useState(false);
  const currentUserType = localStorage.getItem("currentUserType");

  const handleEditClick = (unit) => {
    setShowEditUnitModal((prev) => !prev);
    if(unit && unit.rent_amount){
      getCurrentUnit()
    }
  };

  const handleEditRequestClick = () => {
    showEditRequestModal((prev) => !prev);
  };

  const handleDeleteClick = () => {
    setShowDeleteUnitModal((prev) => !prev)
  }

  const handleDeleteConfirm = async () => {
    const pid = unit.property_id;
    const deleted = await deleteUnit(uid);
    if(deleted){
      history.push(`/property/${pid}`)
    }
  }

  const handleAddMaintenance = () => {
    history.push(`/addMaintenance/${uid}`);
  };

  const getCurrentUnit = async () => {
    const unitData = await getUnit(uid);
    setUnit(unitData.data);
  };

  console.log(
    "lieurbfdjs TYPE!!",
    currentUserType,
    currentUserType === "LANDOWNER"
  );

  useEffect(() => {
    uid && getCurrentUnit();
  }, [uid]);

  return (
    <div className="max-w-full text-black m-10 px-5 py-5 rounded-xl shadow-xl">
      <h3 className="text-2xl block justify-center text-center m-4">
        Unit #{unit.property_id}
      </h3>
      <div className="text-center justify-center items-center">
        <p>Rent Amount: {unit.rent_amount}</p>
        <p>Rent Deposit: {unit.rent_deposit}</p>
        <p>Lease: {unit.lease}</p>
        {unit.tenant && (
          <div>
            <p>Tenant #{unit.tenant.id}</p>
            <p>
              Name: {unit.tenant.first_name} {unit.tenant.last_name}
            </p>
            <p>Email: {unit.tenant.email}</p>
          </div>
        )}
        <button
          className="bg-green-100 font-bold w-auto text-sm uppercase rounded-3xl p-2.5 hover:bg-green-200 text-white m-8"
          onClick={handleEditClick}
        >
          {showEditUnitModal ? "Close" : "Edit"}
        </button>
        <button
          className="bg-green-100 font-bold w-auto text-sm uppercase rounded-3xl p-2.5 hover:bg-green-200 text-white m-8"
          onClick={handleDeleteClick}
        >
          Delete
        </button>
      </div>
      <div>
        {unit.maintenance &&
          unit.maintenance.map((e) => (
            <div>
              <p>Request #{e.id} : </p>
              <p>Unit #{e.unit_id} : </p>
              <p>Message #{e.request} : </p>
              <p>Date Created #{e.date_created} : </p>
              <p>Date Fixed #{e.date_fixed} : </p>
              <Modal close={handleEditRequestClick}>
                <MaintenanceForm
                  unit_id={uid}
                  maintenance_id={e.id}
                  request={e.request}
                />
              </Modal>
            </div>
          ))}
        {}
      </div>
      {currentUserType === "LANDOWNER" && showEditUnitModal && (
        <Modal close={handleEditClick}>
          <UnitForm
            unit_id={uid}
            property_id={unit.property_id}
            rent_amount={unit.rent_amount}
            rent_deposit={unit.rent_deposit}
            lease={unit.lease}
            close={handleEditClick}
          />
        </Modal>
      )}
      {currentUserType === "LANDOWNER" && showDeleteUnitModal && (
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
      {currentUserType === "TENANT" && (
        <button
          className="bg-green-100 font-bold text-sm uppercase rounded-3xl p-2.5 hover:bg-green-200 text-white m-8"
          onClick={handleAddMaintenance}
        >
          Make A Request
        </button>
      )}
    </div>
  );
};
