import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { MaintenanceForm } from "../components/MaintenanceForm";
import { Modal } from "../components/Modal";
import { UnitForm } from "../components/UnitForm";
import { getUnit } from "../utils/services";

export const Unit = () => {
  const history = useHistory();
  const { uid } = useParams();
  const [unit, setUnit] = useState({});
  const [showEditUnitModal, setShowEditUnitModal] = useState(false);
  const [showEditRequestModal, setShowEditRequestModal] = useState(false);
  const currentUserType = localStorage.getItem("currentUserType");

  const handleEditClick = () => {
    setShowEditUnitModal((prev) => !prev);
  };

  const handleEditRequestClick = () => {
    showEditRequestModal((prev) => !prev);
  };

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
          className="bg-green-100 font-bold text-sm uppercase rounded-3xl p-2.5 hover:bg-green-200 text-white m-8"
          onClick={handleEditClick}
        >
          {showEditUnitModal ? "Close" : "Edit"}
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
          />
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
