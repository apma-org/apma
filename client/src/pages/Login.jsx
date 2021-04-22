import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { login } from "../utils/services";

export const Login = () => {
  const history = useHistory();
  const [loginInfo, setLoginInfo] = useState({});

  const handleChange = ({ target: { name, value } }) => {
    setLoginInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userRes = await login(loginInfo);
    if (userRes && userRes.status === 200) {
      localStorage.setItem("currentUserId", userRes.data.id);
      localStorage.setItem("currentUserType", `${loginInfo.type}`);
      localStorage.setItem(
        "currentUserName",
        `${userRes.data.first_name} ${userRes.data.last_name}`
      );
      history.push("/properties");
    } else {
      console.log("ERRRR not logged in");
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
              <option value="TENANT">Tenant</option>
              <option value="LANDOWNER">Landowner</option>
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
            name="password"
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
    </div>
  );
};
