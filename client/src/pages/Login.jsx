import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { getTenant, login } from "../utils/services";
import { LANDOWNER, TENANT } from "../utils/constants";
import UserContext from "../context/UserContext";

export const Login = () => {
  const history = useHistory();
  const [loginInfo, setLoginInfo] = useState({ type: "TENANT" });
  const [errorMessage, setErrorMessage] = useState("");
  const { updateUserId, updateUserType, updateUserName } = useContext(
    UserContext
  );

  const handleChange = ({ target: { name, value } }) => {
    setLoginInfo((prevState) => {
      if (name === "current-password") {
        return { ...prevState, password: value };
      } else {
        return { ...prevState, [name]: value };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userRes = await login(loginInfo);
      // if (userRes && userRes.status === 200) {
      localStorage.setItem("currentUserId", userRes.data.id);
      localStorage.setItem("currentUserType", `${loginInfo.type}`);
      localStorage.setItem(
        "currentUserName",
        `${userRes.data.first_name} ${userRes.data.last_name}`
      );

      updateUserId(userRes.data.id);
      updateUserType(loginInfo.type);
      updateUserName(`${userRes.data.first_name} ${userRes.data.last_name}`);

      if (loginInfo.type === LANDOWNER) {
        history.push("/properties");
      } else {
        const tenant = await getTenant(userRes.data.id);
        /* Navigate to Tenant's Unit Page */
        tenant.unit_id
          ? history.push(`/unit/${tenant.unit_id}`)
          : history.push(`/`);
      }
    } catch {
      setErrorMessage(
        "An error occurred. Double check your User Type (Landowner/Tenant), Email and Password. "
      );
    }
  };

  return (
    <div className="max-w-lg text-white mx-auto bg-green-100 px-5 py-10 rounded-xl shadow-xl">
      <div className="text-center mb-8">
        <h1 className="text-2xl">LOGIN</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mt-5">
          <label>
            Are you a Tenant or a Landowner?
            <select
              className="text-gray-900 block w-full p-2 border-none rounded-lg mb-6"
              name="type"
              required
              onChange={handleChange}
            >
              <option value={TENANT}>Tenant</option>
              <option value={LANDOWNER}>Landowner</option>
            </select>
          </label>
        </div>
        <div className="mt-5">
          <label>Email</label>
          <input
            required
            type="email"
            name="email"
            className="text-gray-900 block w-full p-2 border-none rounded-lg"
            onChange={handleChange}
          />
        </div>
        <div className="mt-5">
          <label>Password</label>
          <input
            required
            type="password"
            name="current-password"
            className="text-gray-900 block w-full p-2 border-none rounded-lg"
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="mt-10 py-3 bg-green-200 text-white w-full hover:bg-green-300 rounded-xl"
        >
          Login
        </button>
      </form>
      {errorMessage && (
        <p className="text-red-600 mt-4 p-4 bg-gray-100">{errorMessage}</p>
      )}
    </div>
  );
};
