import React from "react";
import user from "../images/user.svg";
import logo from "../images/logo.svg";

export const Login = () => {
  return (
    <div className="max-w-lg text-white mx-auto bg-green-100 px-5 py-10 rounded-xl shadow-xl">
      <div className="text-center mb-8">
        <h1 className="text-2xl">LOGIN</h1>
      </div>

      <form>
        <div className="mt-5">
          <label>Email</label>
          <input type="text" class="block w-full p-2 border-none rounded-lg" />
        </div>
        <div className="mt-5">
          <label>Password</label>
          <input type="text" class="block w-full p-2 border-none rounded-lg" />
        </div>
        <div className="mt-10">
          <input
            type="submit"
            class="py-3 bg-green-200 text-white w-full hover:bg-green-300 rounded-xl"
          />
        </div>
      </form>
    </div>
  );
};
