import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export const SignUp = () => {
  const history = useHistory();
  const [loginInfo, setLoginInfo] = useState({});

  const handleChange = (e) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("register", loginInfo);
    // const { user, error } = await loginUser(loginInfo);
    // if (user) {
    history.push("/properties");
    // } else {
    // console.log("ERRRR");
    // }
  };

  return (
    <div className="max-w-lg text-white mx-auto bg-green-100 px-5 py-10 rounded-xl shadow-xl">
      <div className="text-center mb-8">
        <h1 className="text-2xl">SIGN UP</h1>
      </div>

      <form onSubmit={handleSubmit}>
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
