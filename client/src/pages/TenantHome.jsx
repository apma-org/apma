import React, { useState, useEffect } from "react";
import { Modal } from "../components/Modal";
import { useHistory } from "react-router-dom";
import {
  getTenant,
  getUnit,
  addMaintenance,
  deleteMaintenance,
} from "../utils/services";

export const TenantHome = () => {
  const history = useHistory();
  const currentUserId = localStorage.getItem("currentUserId");

  const [maintenance, setMaintenance] = useState([]);
  const [tenantData, setTenantData] = useState({});

  const [showMaintenanceForm, setShowMaintenanceForm] = useState(false);
  const [maintenanceFormData, setMaintenanceFormData] = useState("");

  const [showDeleteMaintenanceModal, setShowDeleteMaintenanceModal] = useState(
    false
  );
  const [errorMessage, setErrorMessage] = useState("");

  const handleMaintenanceForm = async () => {
    try {
      const success = await addMaintenance({
        unit_id: tenantData.unit_id,
        request: maintenanceFormData,
      });

      if (success) {
        getTenantData();
        setMaintenanceFormData("");
        setShowMaintenanceForm(false);
      }
    } catch {
      setErrorMessage("An error occurred. Double check your input fields");
    }
  };

  const getTenantData = async () => {
    const data = await getTenant(currentUserId);
    setTenantData(data.data);
    if (data.data.unit_id) {
      getMaintenance(data.data.unit_id);
    }
  };

  const getMaintenance = async (uid) => {
    const data = await getUnit(uid);
    setMaintenance(data.data.maintenance.reverse());
  };

  const deleteRequest = async () => {
    const success = await deleteMaintenance(showDeleteMaintenanceModal);
    if (success) {
      setShowDeleteMaintenanceModal(false);
      getMaintenance(tenantData.unit_id);
    }
  };

  useEffect(() => {
    currentUserId && getTenantData();
  }, []);

  return (
    <div className="max-w-full text-black m-10 px-5 py-5 rounded-xl shadow-xl">
      {tenantData && !tenantData.unit_id && (
        <>
          <h2 className="text-4xl block justify-center text-center">
            You have not been assigned to a unit yet.
          </h2>
          <h2 className="text-2xl block justify-center text-center">
            Provide landlord with email so you can be assigned.
          </h2>
          <h2 className="text-2xl block justify-center text-center">
            Your Email: {tenantData.email}
          </h2>
        </>
      )}
      {tenantData && tenantData.unit_id && (
        <>
          <h3 className="text-2xl block justify-center text-center">
            {`${tenantData.property.address}, ${tenantData.property.city}, ${tenantData.property.state}, ${tenantData.property.zipcode}`}
          </h3>
          <h3 className="text-2xl block justify-center text-center">
            Rent Amount: ${tenantData.unit.rent_amount}
          </h3>
          <div className="flex flex-row space-x-20 justify-center items-center">
            <button
              onClick={() => setShowMaintenanceForm(!showMaintenanceForm)}
              className="bg-green-100 font-bold text-sm uppercase rounded-xl p-2.5 hover:bg-green-200 text-white m-8"
            >
              Submit Maintenance Request
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th style={{ minWidth: "150px", textAlign: "left" }}>
                    Date Created
                  </th>
                  <th style={{ textAlign: "left" }}>Request</th>
                  <th style={{ minWidth: "150px", textAlign: "left" }}>
                    Status
                  </th>
                  <th style={{ minWidth: "50px", textAlign: "left" }}></th>
                </tr>
              </thead>
              <tbody>
                {maintenance &&
                  maintenance.map((e, idx) => (
                    <tr key={idx}>
                      <td>{e.date_created}</td>
                      <td>{e.request}</td>
                      <td>
                        {e.date_fixed ? `Completed ${e.date_fixed}` : "Pending"}
                      </td>
                      <td>
                        <button
                          onClick={() => setShowDeleteMaintenanceModal(e.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {showDeleteMaintenanceModal && (
            <Modal close={() => setShowDeleteMaintenanceModal(false)}>
              <h4 className="text-xl block justify-center text-center">
                <b>Are you sure you want to delete this request?</b>
              </h4>
              <div className="flex flex-row space-x-20 justify-center items-center">
                <button
                  className="mt-10 py-3 bg-green-200 text-white w-6/12 hover:bg-green-300 rounded-xl"
                  onClick={deleteRequest}
                >
                  Confirm
                </button>
              </div>
            </Modal>
          )}
          {showMaintenanceForm && (
            <Modal close={() => setShowMaintenanceForm(!showMaintenanceForm)}>
              <h4 className="text-xl block justify-center text-center">
                Enter Request Below:
              </h4>
              <div className="mt-5">
                <textarea
                  required
                  type="text"
                  name="request"
                  value={maintenanceFormData}
                  rows={5}
                  className="text-gray-900 block w-full p-2 border-none rounded-lg"
                  onChange={(e) => setMaintenanceFormData(e.target.value)}
                />
              </div>
              <div className="flex flex-row space-x-20 justify-center items-center">
                {errorMessage && (
                  <p className="text-red-600 mt-4 p-4 bg-gray-100">
                    {errorMessage}
                  </p>
                )}
                <button
                  className="mt-10 py-3 bg-green-200 text-white w-6/12 hover:bg-green-300 rounded-xl"
                  onClick={handleMaintenanceForm}
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
