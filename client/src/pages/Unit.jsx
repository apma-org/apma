import React, { useContext } from "react";
import { useHistory, useParams } from "react-router";
import UserContext from "../context/UserContext";

export const Unit = ({ status, tenant }) => {
  const history = useHistory();
  const { uid } = useParams();
  const { user } = useContext(UserContext);

  const handleEditUnit = () => {
    history.push("/editUnit");
  };

  return (
    <div className="max-w-full text-black m-10 px-5 py-5 rounded-xl shadow-xl">
      <h3 className="text-2xl block justify-center text-center m-4">
        123 Bob Avenue, Unit #{uid}
      </h3>

      <div className="flex flex-row space-x-20 justify-center items-center">
        <h4 className="text-xl block justify-center text-center">
          <b> Occupied:</b> ${status ? "T" : "F"}
          {status && <b>Tenant: {tenant}</b>}
        </h4>
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
