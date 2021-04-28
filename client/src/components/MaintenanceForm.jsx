import React, { useState } from "react";
import { editMaintenance } from "../utils/services";

export const MaintenanceForm = ({ unit_id, maintenance_id, request }) => {
  const [maintenanceInfo, setMaintenanceInfo] = useState({
    request,
  });

  const handleChange = ({ target: { name, value } }) => {
    setMaintenanceInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (maintenanceInfo) {
      const data = await editMaintenance(
        maintenanceInfo,
        maintenance_id,
        unit_id
      );
      console.log("blah M", data);
    }
  };

  return (
    <form
      className="text-greens-900"
      onSubmit={() => handleSubmit(maintenanceInfo)}
    >
      <div className="mt-5">
        <label>Request</label>
        <input
          required
          type="text"
          name="request"
          defaultValue={request || ""}
          className="text-gray-900 block w-full p-2 border-none rounded-lg"
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        className="mt-10 py-3 bg-green-200 text-white w-full hover:bg-green-300 rounded-xl"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </form>
  );
};
