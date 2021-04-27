import React, { useState, useEffect } from "react";
import { Modal } from "../components/Modal";
import { useHistory } from "react-router-dom";
import { getTenant, getUnit, addMaintenance } from "../utils/services";

export const TenantHome = () => {
  const history = useHistory();
  const currentUserId = localStorage.getItem("currentUserId");

  const [maintenance, setMaintenance] = useState([])
  const [tenantData, setTenantData] = useState({})

  const [showMaintenanceForm, setShowMaintenanceForm] = useState(false)
  const [maintenanceFormData, setMaintenanceFormData] = useState("")

  const handleMaintenanceForm = async () => {
    const success = await addMaintenance({
      unit_id: tenantData.unit_id,
      request: maintenanceFormData,
    })

    if(success){
      getTenantData()
      setShowMaintenanceForm(false)
    }
  };

  const getTenantData = async () => {
      const data = await getTenant(currentUserId)
      setTenantData(data.data)
      if(data.data.unit_id){
        getMaintenance(data.data.unit_id)
      }
  }

  const getMaintenance = async (uid) => {
    const data = await getUnit(uid)
    setMaintenance(data.data.maintenance.reverse())
  }


  useEffect(() => {
    currentUserId && getTenantData();
  }, []);

  return (
    <div className="max-w-full text-black m-10 px-5 py-5 rounded-xl shadow-xl">
        {tenantData && !tenantData.unit_id &&
            <>
            <h2 className="text-4xl block justify-center text-center">You have not been assigned to a unit yet.</h2>
            <h2 className="text-2xl block justify-center text-center">Provide landlord with email so you can be assigned.</h2>
            <h2 className="text-2xl block justify-center text-center">Your Email: {tenantData.email}</h2>
            </>
        }
        {tenantData && tenantData.unit_id &&
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
          <div >
            {maintenance &&
              maintenance.map((e, idx) => (
                <h1 key={idx} className="text-1xl block justify-center text-center">Request #{idx + 1}: {e.request} Date Submitted: {e.date_created}</h1>
              ))}
          </div>
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
        }
    </div>
  );
};
