import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { getUnit } from "../utils/services";

export const Unit = () => {
  const history = useHistory();
  const { upid } = useParams();
  const [unit, setUnit] = useState({});

  const handleEditUnit = () => {
    history.push(`/editUnit`);
  };

  const getCurrentUnit = async () => {
    const unitData = await getUnit(upid);
    console.log(unitData);
    setUnit(unitData.data);
  };

  useEffect(() => {
    upid && getCurrentUnit();
  }, [upid]);

  return (
    <div className="max-w-full text-black m-10 px-5 py-5 rounded-xl shadow-xl">
      <h3 className="text-2xl block justify-center text-center m-4">
        Unit #{unit.property_id}
      </h3>
      <div className="text-center justify-center items-center">
        <p>Rent Amount: {unit.rent_amount}</p>
        <p>Rent Deposit: {unit.rent_deposit}</p>
        <p>Lease: {unit.lease}</p>
        <button
          className="bg-green-100 font-bold text-sm uppercase rounded-3xl p-2.5 hover:bg-green-200 text-white m-8"
          onClick={handleEditUnit}
        >
          Edit Unit
        </button>
      </div>
    </div>
  );
};
