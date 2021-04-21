import React, { useContext, useState, useEffect } from "react";
import { PropertyCard } from "../components/PropertyCard";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import { getLandowner } from "../utils/services";

export const Properties = () => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const [totalProfits, setTotalProfits] = useState(8298.23);
  const [properties, setProperties] = useState([]);
  // const [properties, setProperties] = useState([
  //   {
  //     address: "123 Bob Avenue",
  //     maintenanceRequests: [
  //       {
  //         request: "Water heater is broken",
  //       },
  //       { request: "Sink is broken" },
  //     ],
  //     monthlyProfits: 4000,
  //   },
  //   {
  //     address: "123 Mockingjay Street",
  //     maintenanceRequests: [
  //       {
  //         request: "The Lights are flickering",
  //       },
  //     ],
  //     monthlyProfits: 3000,
  //   },
  //   {
  //     address: "Terrance Avenue",
  //     maintenanceRequests: [
  //       {
  //         request: "The kitchen needs to be repainted",
  //       },
  //       { request: "The cabinet door is broken" },
  //       { request: "The window needs washing" },
  //     ],
  //     monthlyProfits: 2500,
  //   },
  //   {
  //     address: "123 Neverland",
  //     maintenanceRequests: [
  //       {
  //         request: "The garden needs to be planted",
  //       },
  //       { request: "There is no hot water." },
  //     ],
  //     monthlyProfits: 5450,
  //   },
  //   {
  //     address: "123 Narnia",
  //     maintenanceRequests: [],
  //     monthlyProfits: 7450,
  //   },
  // ]);

  const handleAddForm = () => {
    history.push("/addProperty");
  };

  const getUser = async () => {
    const u = await getLandowner(user.id);
    setProperties(u.properties);
    console.log("Properties file user", u);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="max-w-full text-black m-10 px-5 py-5 rounded-xl shadow-xl">
      <h3 className="text-2xl block justify-center text-center">Properties</h3>
      <div className="flex flex-row space-x-20 justify-center items-center">
        <h3 className="text-xl block justify-center text-center m-4">
          <b>Total Profits:</b> ${totalProfits}/month
        </h3>
        <button
          onClick={handleAddForm}
          className="bg-green-100 font-bold text-sm uppercase rounded-xl p-2.5 hover:bg-green-200 text-white m-8"
        >
          Add Property
        </button>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-4 p-4 pb-6">
        {properties != null &&
          properties.map((e, idx) => (
            <PropertyCard
              key={idx}
              address={e.address}
              maintenanceRequests={e.maintenanceRequests}
              monthlyProfits={e.monthlyProfits}
            />
          ))}
      </div>
    </div>
  );
};
