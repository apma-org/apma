import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { addMaintenance } from "../utils/services";

export const NewMaintenance = () => {
  const history = useHistory();
  const { uid } = useParams();
  const [maintenanceInfo, setMaintenanceInfo] = useState({
    unit_id: uid,
    request: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setMaintenanceInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await addMaintenance({
      ...maintenanceInfo,
    });
    console.log(success);
    history.push(`/unit/${uid}`);
  };

  // TODO: Input fields
  return (
    <div className="max-w-lg text-white mb-10 mx-auto bg-green-100 px-5 py-10 rounded-xl shadow-xl">
      <div className="text-center mb-8">
        <h1 className="text-2xl">Submit Request</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mt-5">
          <label>Request</label>
          <input
            required
            type="text"
            name="request"
            className="text-gray-900 block w-full p-2 border-none rounded-lg"
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="mt-10 py-3 bg-green-200 text-white w-full hover:bg-green-300 rounded-xl"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
