import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import { LANDOWNER, TENANT } from "../utils/constants";
import { register, login, getTenant } from "../utils/services";

export const SignUp = () => {
  const history = useHistory();
  const [registerInfo, setRegisterInfo] = useState({
    type: TENANT,
  });
  const { updateUserId, updateUserType, updateUserName } = useContext(
    UserContext
  );
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = ({ target: { name, value } }) => {
    setRegisterInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const status = await register({ ...registerInfo }, registerInfo.type);
      const userRes = await login(registerInfo);

      localStorage.setItem("currentUserId", userRes.data.id);
      localStorage.setItem("currentUserType", `${registerInfo.type}`);
      localStorage.setItem(
        "currentUserName",
        `${userRes.data.first_name} ${userRes.data.last_name}`
      );

      updateUserId(userRes.data.id);
      updateUserType(registerInfo.type);
      updateUserName(`${userRes.data.first_name} ${userRes.data.last_name}`);

      if (registerInfo.type === LANDOWNER) {
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
        "Unable to Register User. Double check registration information. "
      );
    }
  };

  return (
    <div className="max-w-lg text-white mx-auto bg-green-100 px-5 py-10 rounded-xl shadow-xl">
      <div className="text-center mb-8">
        <h1 className="text-2xl">SIGN UP</h1>
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
              defaultValue={registerInfo.type}
            >
              <option value={TENANT}>Tenant</option>
              <option value={LANDOWNER}>Landowner</option>
            </select>
          </label>
        </div>
        <div className="mt-5">
          <label>First Name</label>
          <input
            required
            type="text"
            name="first_name"
            className="text-gray-900 block w-full p-2 border-none rounded-lg"
            onChange={handleChange}
          />
        </div>
        <div className="mt-5">
          <label>Last Name</label>
          <input
            required
            type="text"
            name="last_name"
            className="text-gray-900 block w-full p-2 border-none rounded-lg"
            onChange={handleChange}
          />
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
            name="password"
            className="text-gray-900 block w-full p-2 border-none rounded-lg"
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="mt-10 py-3 bg-green-200 text-white w-full hover:bg-green-300 rounded-xl"
        >
          Register
        </button>
      </form>
      {errorMessage && (
        <p className="text-red-600 mt-4 p-4 bg-gray-100">{errorMessage}</p>
      )}
    </div>
  );
};
