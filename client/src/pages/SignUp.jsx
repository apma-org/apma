import React, { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import { useHistory } from "react-router-dom";
import { register, login } from "../utils/services";

export const SignUp = () => {
  const history = useHistory();
  const { updateUser } = useContext(UserContext);
  const [registerInfo, setRegisterInfo] = useState({
    type: "TENANT",
  });

  const handleChange = ({ target: { name, value } }) => {
    setRegisterInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("register", registerInfo);
    const status = await register({ ...registerInfo }, registerInfo.type);
    console.log("Status", status);

    // Login User
    if (status === 200) {
      const user = await login(registerInfo);
      if (user.status !== 400) {
        console.log("user", user);
        // Update User Context
        updateUser(user); // TODO: Double Check Syncing
        history.push("/properties");
      }
    } else {
      console.log("ERRRR not logged in");
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
              <option value="TENANT">Tenant</option>
              <option value="LANDOWNER">Landowner</option>
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
    </div>
  );
};
