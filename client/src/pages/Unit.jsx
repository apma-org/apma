import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Modal } from "../components/Modal";
import { LANDOWNER } from "../utils/constants";
import { UnitForm } from "../components/UnitForm";
import {
  getUnit,
  deleteUnit,
  assignTenant,
  assignTenantEmail,
  editMaintenance,
} from "../utils/services";

export const Unit = () => {
  const history = useHistory();
  const { uid } = useParams();
  const [unit, setUnit] = useState({});
  const [showEditUnitModal, setShowEditUnitModal] = useState(false);
  const [showDeleteUnitModal, setShowDeleteUnitModal] = useState(false);
  const [showUnassignModal, setShowUnassignModal] = useState(false);
  const currentUserType = localStorage.getItem("currentUserType");

  const [tenantFormData, setTenantFormData] = useState("");

  const handleEditClick = (unit) => {
    setShowEditUnitModal((prev) => !prev);
    if (unit && unit.rent_amount) {
      getCurrentUnit();
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteUnitModal((prev) => !prev);
  };

  const handleUnassignClick = () => {
    setShowUnassignModal((prev) => !prev);
  };

  const handleDeleteConfirm = async () => {
    const pid = unit.property_id;
    const deleted = await deleteUnit(uid);
    if (deleted) {
      history.push(`/property/${pid}`);
    }
  };

  const handleUnassignConfirm = async () => {
    setShowUnassignModal((prev) => !prev);
    const success = await assignTenant(unit.tenant.id, null);
    if (success) {
      getCurrentUnit();
    }
  };

  const processMaintenanceRequest = async (maintenanceData) => {
    const m_id = maintenanceData.id;
    delete maintenanceData.id;
    var d = new Date();
    const date =
      d.getMonth() +
      1 +
      "/" +
      d.getDate() +
      "/" +
      d.getFullYear().toString().slice(-2);
    maintenanceData.date_fixed = date;
    const success = await editMaintenance(maintenanceData, m_id);
    if (success) {
      getCurrentUnit();
    }
  };

  const handleTenantSubmit = async (e) => {
    e.preventDefault();
    const success = await assignTenantEmail(tenantFormData, uid);
    setTenantFormData("")
    if (success) {
      getCurrentUnit();
    }
  };

  const getCurrentUnit = async () => {
    const unitData = await getUnit(uid);
    setUnit(unitData.data);
  };

  useEffect(() => {
    uid && getCurrentUnit();
  }, [uid]);

  console.log(unit)

  return (
    <div className="max-w-full text-black m-10 px-5 py-5 rounded-xl shadow-xl">
      <h3 className="text-2xl block justify-center text-center m-4">
        Unit #{unit.id}
      </h3>
      <div className="text-center justify-center items-center">
        <p>Rent Amount: {unit.rent_amount}</p>
        <p>Rent Deposit: {unit.rent_deposit}</p>
        <div>
        <button
              className="bg-green-100 font-bold w-auto text-sm uppercase rounded-3xl p-2.5 hover:bg-green-200 text-white m-4 mb-1"
              onClick={() => window.open(unit.lease, "_blank")}
            >
              See Lease
        </button>
        </div>
        <button
          className="bg-green-100 font-bold w-auto text-sm uppercase rounded-3xl p-2.5 hover:bg-green-200 text-white m-4"
          onClick={handleEditClick}
        >
          {showEditUnitModal ? "Close" : "Edit Unit"}
        </button>
        <button
          className="bg-green-100 font-bold w-auto text-sm uppercase rounded-3xl p-2.5 hover:bg-green-200 text-white m-4 mb-12"
          onClick={handleDeleteClick}
        >
          Delete Unit
        </button>
        {unit.tenant ? (
          <div>
            <p>
              Tenant Name: {unit.tenant.first_name} {unit.tenant.last_name}
            </p>
            <p>Email: {unit.tenant.email}</p>
            <button
              className="bg-green-100 font-bold w-auto text-sm uppercase rounded-3xl p-2.5 hover:bg-green-200 text-white m-8 mt-4"
              onClick={handleUnassignClick}
            >
              Unassign Tenant
            </button>
            {showUnassignModal && (
              <Modal close={handleUnassignClick}>
                <h4 className="text-xl block justify-center text-center">
                  <b>Are you sure you want to unassign this tenant?</b>
                </h4>
                <div className="flex flex-row space-x-20 justify-center items-center">
                  <button
                    className="mt-10 py-3 bg-green-200 text-white w-6/12 hover:bg-green-300 rounded-xl"
                    onClick={handleUnassignConfirm}
                  >
                    Confirm
                  </button>
                </div>
              </Modal>
            )}
          </div>
        ) : (
          <div className="text-center bg-green-100 p-2.5 justify-center items-center w-6/12 m-auto mb-16 rounded-xl">
            <form onSubmit={handleTenantSubmit}>
              <div className="mt-5">
                <label>Assign Tenant:</label>
                <input
                  required
                  type="text"
                  name="address"
                  value={tenantFormData}
                  className="text-gray-900 block w-full p-2 border-none rounded-lg"
                  onChange={(e) => setTenantFormData(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="mt-10 py-3 bg-green-200 text-white w-6/12 hover:bg-green-300 rounded-xl"
              >
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
      <h3 className="text-2xl block justify-center text-center m-4">
         MAINTENANCE
      </h3>
      {unit.maintenance && unit.maintenance.length == 0 &&
        <h3 className="text-2xl block justify-center text-center m-2">
          No Maintenance Requests
        </h3>
      }
      {unit.maintenance && unit.maintenance.length != 0 && 
      <div className="bg-white shadow-md rounded my-6">
        <table className="table-auto w-full">
          <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="p-1.5" style={{ minWidth: "150px", textAlign: "left" }}>
                Date Created
              </th>
              <th style={{ textAlign: "left" }}>Request</th>
              <th className="content-center">
                Date Fixed
              </th>
            </tr>
          </thead>
          <tbody>
            {unit.maintenance &&
              unit.maintenance.map((e, idx) => (
                <tr key={idx}>
                  <td className="p-2.5">{e.date_created}</td>
                  <td>{e.request}</td>
                  <td className="content-center" style={{ minWidth: "200px", textAlign:'center' }}>
                  {e.date_fixed ? e.date_fixed : (
                    <button
                      className="bg-green-100 font-bold w-auto text-sm uppercase rounded-3xl p-2.5 hover:bg-green-200 text-white m-4"
                      onClick={() => processMaintenanceRequest(e)}
                    >
                      Mark as Fixed
                    </button>
                  )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>}
      {currentUserType === LANDOWNER && showEditUnitModal && (
        <Modal close={handleEditClick}>
          <UnitForm
            unit_id={uid}
            property_id={unit.property_id}
            rent_amount={unit.rent_amount}
            rent_deposit={unit.rent_deposit}
            lease={unit.lease}
            close={handleEditClick}
            isAdding={false}
          />
        </Modal>
      )}
      {currentUserType === LANDOWNER && showDeleteUnitModal && (
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
    </div>
  );
};
